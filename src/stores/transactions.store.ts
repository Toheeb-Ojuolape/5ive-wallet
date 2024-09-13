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
  }),

  actions: {
    getBalance(transactions) {
      this.balance = transactionService.getBalance(transactions);
      return this.balance;
    },
    
    async fetchTransactions() {
      try {
        this.loading = true;
        const customerDid = await authService.getDid();
        const transactions = await transactionService.fetchTransactions(
          customerDid
        );
        this.transactions = groupTransactions(transactions);
        this.alltransactions = groupTransactions(transactions);
        this.balance = this.getBalance(this.alltransactions);
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
