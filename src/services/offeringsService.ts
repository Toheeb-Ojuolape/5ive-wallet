import { Close, Order, Rfq, TbdexHttpClient } from "@tbdex/http-client";
import { DEFAULTPAYIN, PROTOCOL } from "@/constants/constant";

export default {
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
        protocol: PROTOCOL,
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
