import { handleErrors } from "@/utils/handlers";
import { Offering, Rfq, TbdexHttpClient } from "@tbdex/http-client";
import {  DidDht } from "@web5/dids";
import { defineStore } from "pinia";

export const useTransactionStore = defineStore("transactionStore", {
  state: () => ({
    transactions: [],
    balance: [],
    customerDid: localStorage.getItem("customerDid"),
    offering: JSON.parse(localStorage.getItem("offering")) as Offering,
    rfq: JSON.parse(localStorage.getItem("rfq")) as Rfq,
  }),

  actions: {
    async fetchTransactions() {
      try {
        const customerDid = await DidDht.import({
          portableDid: JSON.parse(this.customerDid),
        });

        const transactions = await TbdexHttpClient.getExchanges({
          pfiDid: this.offering.metadata.from,
          did: customerDid,
        });

        console.log(transactions);
      } catch (error) {
        handleErrors(error);
      }
    },

    //     async getBalance() {
    //       try {
    //         const customerDid = await DidDht.import({
    //           portableDid: JSON.parse(this.customerDid),
    //         });
    //         const balance = await TbdexHttpClient.getBalances({
    //           pfiDid: this.offering.metadata.from,
    //           did: customerDid,
    //         });

    //         console.log(balance);
    //       } catch (error) {
    //         handleErrors(error);
    //       }
    //     },
  },
});
