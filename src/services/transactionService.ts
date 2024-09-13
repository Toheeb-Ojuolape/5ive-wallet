import { AvgRating, Rating } from "@/interfaces/user";
import pfis from "@/pfis/pfis.json";
import { Message, TbdexHttpClient } from "@tbdex/http-client";

export default {
  async fetchTransactions(customerDid) {
    const allTransactions: Message[][] = [];
    for (const pfi of pfis.pfis) {
      const transactions = await TbdexHttpClient.getExchanges({
        pfiDid: pfi.did,
        did: customerDid,
      });

      allTransactions.push(...transactions);
    }
    return allTransactions.flat();
  },

  getBalance(transactions) {
    const balances = {};
    for (const transaction of transactions) {
      if (transaction[transaction.length - 2]?.data.orderStatus === "SUCCESS") {
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
  },

  getPayinBalance(transactions) {
    const balances = {};
    for (const transaction of transactions) {
      if (transaction[transaction.length - 2]?.data.orderStatus === "SUCCESS") {
        const payin = transaction[1]?.data.payin;

        if (payin) {
          const { currencyCode, amount } = payin;
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
  },

  groupAndAveragePFIRating(ratings: Rating[]) {
    const groupedData = {} as AvgRating;

    ratings.forEach((item) => {
      if (!groupedData[item.pfi]) {
        groupedData[item.pfi] = {
          pfi: item.pfi,
          did: item.did,
          totalRating: 0,
          count: 0,
        };
      }
      groupedData[item.pfi].totalRating += item.rating;
      groupedData[item.pfi].count += 1;
    });

    const result = Object.values(groupedData).map((group: AvgRating) => ({
      pfi: group.pfi,
      did: group.did,
      rating: group.totalRating / group.count,
    }));

    return result.sort((a, b) => b.rating - a.rating);
  },

  groupTransactionsByDid(groupedtransactions) {
    const groupedTransactions = {};

    groupedtransactions.forEach((transaction) => {
      const did = transaction[0].metadata.to;

      if (groupedTransactions[did]) {
        groupedTransactions[did]++;
      } else {
        groupedTransactions[did] = 1;
      }
    });

    const result = Object.entries(groupedTransactions).map(([did, value]) => ({
      did,
      value,
    }));
    return result;
  },
};
