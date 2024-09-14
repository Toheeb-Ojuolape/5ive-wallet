import {
  Close,
  Offering,
  Order,
  Rfq,
  TbdexHttpClient,
} from "@tbdex/http-client";
import { DEFAULTPAYIN, PROTOCOL } from "@/constants/constant";
import pfiData from "../pfis/pfis.json";
import { getRequiredPayinDetails } from "@/utils/formatter";

export default {
  async fetchOfferings(offering) {
    const { pfis } = pfiData;
    const selectedPFIs = pfis.filter((pfi) => pfi.offerings.includes(offering));
    const dids = selectedPFIs.map((pfi) => pfi.did);

    const allOfferings: Offering[] = [];
    for (const did of dids) {
      const fetchedOfferings = await TbdexHttpClient.getOfferings({
        pfiDid: did,
      });

      allOfferings.push(...fetchedOfferings);
    }

    return allOfferings;
  },

  async requestQuote(
    offering,
    did,
    amount,
    payin,
    paymentDetails,
    customerCredential,

  ) {
    const rfq = Rfq.create({
      metadata: {
        to: offering.metadata.from,
        from: did.uri,
        protocol: PROTOCOL,
      },
      data: {
        offeringId: offering.metadata.id,
        payin: {
          kind: offering.data.payin.methods[payin].kind,
          amount: amount,
          paymentDetails: getRequiredPayinDetails(offering,payin),
        },
        payout: {
          kind: offering.data.payout.methods[payin].kind,
          paymentDetails: paymentDetails,
        },
        claims: customerCredential,
      },
    });

    await rfq.sign(did);

    await TbdexHttpClient.createExchange(rfq);

    const order = Order.create({
      metadata: {
        from: did.uri,
        to: offering.metadata.from,
        exchangeId: rfq.exchangeId,
        protocol: PROTOCOL,
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
        protocol: PROTOCOL,
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
        protocol: PROTOCOL,
      },
      data: {
        reason,
      },
    });

    await close.sign(did);
    await TbdexHttpClient.submitClose(close);

    return close;
  },
};
