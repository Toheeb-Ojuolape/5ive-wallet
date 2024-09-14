import authService from "@/services/authService";
import transactionService from "@/services/transactionService";
import { groupTransactions } from "@/utils/formatter";
import { handleErrors } from "@/utils/handlers";
import { defineStore } from "pinia";

export const useTransactionStore = defineStore("transactionStore", {
  state: () => ({
    transactions: [],
    balance: [],
    loading: false,
    alltransactions: [],
    payinbalance: [],
    ratings: JSON.parse(localStorage.getItem("rating")) || [],
  }),

  getters: {
    balances() {
      return this.balance.map((balance) => balance.amount);
    },

    currencies() {
      return this.balance.map((balance) => balance.currencyCode);
    },

    payinbalances() {
      return this.payinbalance.map((balance) => balance.amount);
    },

    payincurrencies() {
      return this.payinbalance.map((balance) => balance.currencyCode);
    },

    groupedPFIsbyRating() {
      return transactionService.groupAndAveragePFIRating(this.ratings);
    },

    groupTransactionsByPFIs() {
      return transactionService.groupTransactionsByDid(this.alltransactions);
    },
  },

  actions: {
    getBalance(transactions) {
      this.balance = transactionService.getBalance(transactions);
      return this.balance;
    },

    getPayinBalance(transactions) {
      this.payinbalance = transactionService.getPayinBalance(transactions);
      return this.payinbalance;
    },

    async fetchTransactions() {
      try {
        //using this to implement some form of caching so transactions don't fetch all the time
        if (this.transactions.length) {
          return;
        }

        this.loading = true;
        const customerDid = await authService.getDid();
        const transactions = await transactionService.fetchTransactions(
          customerDid
        );

        this.transactions = groupTransactions(transactions);
        this.alltransactions = groupTransactions(transactions);

        this.balance = this.getBalance(this.alltransactions);
        this.payinbalance = this.getPayinBalance(this.alltransactions);

        this.loading = false;
      } catch (error) {
        handleErrors(error);
        this.loading = false;
      }
    },

    async filterTransactions(e) {
      const [[key, value]] = Object.entries(e);
      if (key == "kind") {
        this.transactions = this.alltransactions.filter(
          (transaction) => transaction[key] === value
        );
      } else {
        this.transactions = this.alltransactions.filter(
          (transaction) => transaction.data.orderStatus === value
        );
      }
    },
  },
});
