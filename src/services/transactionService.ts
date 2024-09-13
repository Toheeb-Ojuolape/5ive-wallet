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

  getBalance(transactions){
    const balances = {};
      for (const transaction of transactions) {
        if (
          transaction[transaction.length - 2]?.data.orderStatus === "SUCCESS"
        ) {
          const payout = transaction[1]?.data.payout;

          if (payout) {
            const { currencyCode, amount } = payout;
            const numericAmount = parseFloat(amount);
            if (balances[currencyCode]) {
              balances[currencyCode] += numericAmount;
            } else {
              balances[currencyCode] = numericAmount;
            }
          }
        }
      }
      const result = Object.keys(balances).map((currency) => ({
        currencyCode: currency,
        amount: balances[currency],
      }));
      return result;
  }
};
