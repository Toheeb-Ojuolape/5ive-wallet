import authService from "@/services/authService";
import transactionService from "@/services/transactionService";
import { handleErrors } from "@/utils/handlers";
import { defineStore } from "pinia";

export const useTransactionStore = defineStore("transactionStore", {
  state: () => ({
    transactions: [],
    balance: [],
    loading: false
  }),

  actions: {
    async fetchTransactions() {
      try {
        this.loading = true
        const customerDid = await authService.getDid()
        const transactions = await transactionService.fetchTransactions(customerDid)
        this.transactions = transactions
        console.log(transactions)
        this.loading = false
      } catch (error) {
        handleErrors(error);
        this.loading = false
      }
    },
  },
});
