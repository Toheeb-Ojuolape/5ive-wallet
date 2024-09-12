import pfis from "@/pfis/pfis.json";
import {  Message, TbdexHttpClient } from "@tbdex/http-client";

export default {
  async fetchTransactions(customerDid) {
    const allTransactions: Message[][] = [];
    for (const pfi of pfis.pfis) {
      const transactions = await TbdexHttpClient.getExchanges({
        pfiDid: pfi.did,
        did: customerDid,
      });

      allTransactions.push(...transactions)
    }
    return allTransactions.flat()
  },
};
