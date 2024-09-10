import axios from "axios";
import { handleErrors } from "@/utils/handlers";
import { DidServiceEndpoint } from "@web5/dids";
import { Close, Order, Rfq, TbdexHttpClient } from "@tbdex/http-client";
import { DEFAULTPAYIN } from "@/constants/constant";

export default {
  async getOfferings(did) {
    try {
      // first create the url for the offering
      const response: DidServiceEndpoint | DidServiceEndpoint[] =
        await TbdexHttpClient.getPfiServiceEndpoint(did);

      const endpoint = Array.isArray(response) ? response : [response];

      const apiRoute: string = `${endpoint}/offerings`;
      const offers = await axios.get(apiRoute);
      return offers.data.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  async requestVc({ name, country, did }) {
    try {
      const response = await axios.get(
        `https://mock-idv.tbddev.org/kcc?name=${name}&country=${country}&did=${did}`
      );
      console.log(response);
      return response;
    } catch (error) {
      handleErrors(error.message);
    }
  },

  async requestQuote(
    offering,
    did,
    amount,
    paymentDetails,
    customerCredential
  ) {
    const rfq = Rfq.create({
      metadata: {
        to: offering.metadata.from,
        from: did.uri,
        protocol: "1.0",
      },
      data: {
        offeringId: offering.metadata.id,
        payin: {
          kind: offering.data.payin.methods[0].kind,
          amount: amount,
          paymentDetails: DEFAULTPAYIN,
        },
        payout: {
          kind: offering.data.payout.methods[0].kind,
          paymentDetails: paymentDetails,
        },
        claims: customerCredential,
      },
    });

    localStorage.setItem("rfq", JSON.stringify(rfq));

    await rfq.sign(did);

    await TbdexHttpClient.createExchange(rfq);

    const order = Order.create({
      metadata: {
        from: did.uri,
        to: offering.metadata.from,
        exchangeId: rfq.exchangeId,
        protocol: "1.0",
      },
    });
    return { order, rfq };
  },

  async submitOrder(offer, did, rfq) {
    const order = Order.create({
      metadata: {
        from: did.uri,
        to: offer.metadata.from,
        exchangeId: rfq.exchangeId,
        protocol: "1.0",
      },
    });

    await order.sign(did);
    const response = await TbdexHttpClient.submitOrder(order);
    return response;
  },

  
  async cancelOrder(offer, did, rfq, reason) {
    const close = Close.create({
      metadata: {
        from: did.uri,
        to: offer.metadata.from,
        exchangeId: rfq.exchangeId,
        protocol: "1.0",
      },
      data: {
        reason,
      },
    });

    await close.sign(this.did);
    await TbdexHttpClient.submitClose(close);

    return close;
  },
};
