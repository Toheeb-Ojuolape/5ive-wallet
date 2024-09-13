import { defineStore } from "pinia";
import pfiData from "../pfis/pfis.json";
import {
  Close,
  Offering,
  Order,
  Rfq,
  TbdexHttpClient,
} from "@tbdex/http-client";
import { handleErrors } from "@/utils/handlers";
import offeringsService from "@/services/offeringsService";
import { useMessageStore } from "./message.store";
import { DidDht } from "@web5/dids";
import { PresentationExchange } from "@web5/credentials";
import { CurrencyPair } from "@/interfaces/currency";
import { PROTOCOL } from "@/constants/constant";
import authService from "@/services/authService";

export const useOfferingsStore = defineStore("offeringStore", {
  state: () => ({
    currencypair: {} as CurrencyPair,
    isVcActive: false,
    loading: false,
    loadingMessage: "",
    offerings: [] as Offering[],
    isVcLoading: false,
    vcstep: 1,
    vcs: (JSON.parse(localStorage.getItem("vc")) as string[]) || [],
    offering: Offering,
    customerCredential: [] as string[],
    amount: "",
    storedDid: localStorage.getItem("customerDid"),
    rfq: Rfq,
    order: Order,
    reason: "",
    isRating: false,
  }),

  actions: {
    setCurrencypair(currencypair: CurrencyPair) {
      this.currencypair = currencypair;
      this.fetchOfferings();
    },

    async fetchOfferings() {
      this.loading = true;
      this.loadingMessage = "Fetching available offers";
      let offering = this.currencypair.from + " to " + this.currencypair.to;

      // check the pfis that offer the user's offering request
      const { pfis } = pfiData;
      const selectedPFIs = pfis.filter((pfi) =>
        pfi.offerings.includes(offering)
      );
      const dids = selectedPFIs.map((pfi) => pfi.did);

      // fetch the offers in the PFIs and push it into offerings
      const allOfferings: Offering[] = [];
      try {
        for (const did of dids) {
          const fetchedOfferings = await TbdexHttpClient.getOfferings({
            pfiDid: did,
          });

          allOfferings.push(...fetchedOfferings);
        }

        //filter all the offerings from the selected PFIs again based on currency pair
        this.offerings = allOfferings.filter(
          (offering) =>
            offering.data.payin.currencyCode === this.currencypair.from &&
            offering.data.payout.currencyCode === this.currencypair.to
        );
        this.loading = false;

        // send a message to the user

        const messageStore = useMessageStore();
        messageStore.addMessage(
          "SELLER",
          `We found ${this.offerings.length} offer${
            this.offerings.length > 1 ? "s" : ""
          } matching your currency pair request`,
          "text"
        );

        messageStore.addMessage("", "", "offers");
      } catch (error) {
        handleErrors(error);
      }
    },

    selectOffer(offer) {
      this.offering = offer;

      localStorage.setItem("offering", JSON.stringify(offer));

      // check if the customer has a VC, if they don't request for one
      if (this.customerCredential.length) {
        const messageStore = useMessageStore();
        messageStore.addMessage(
          "SELLER",
          "Great, we have received your Verifiable Credential, now kindly enter the amount you would like to send",
          "text"
        );

        messageStore.setStage("ENTER AMOUNT");
        return;
      }
      this.toggleVc();
    },

    toggleVc() {
      this.isVcActive = !this.isVcActive;
    },

    closeRating() {
      this.isRating = !this.isRating;
    },

    submitRating(rating) {
      let ratings = JSON.parse(localStorage.getItem("rating")) || [];
      ratings.push(rating);
      localStorage.setItem("rating", JSON.stringify(ratings));
    },

    async requestVc(user) {
      this.isVcLoading = true;
      const { name, country } = user;
      //request did for user here

      //TODO: move did request to first instance of signing on to the platform
      try {
        const did = await authService.getDid();

        const response = await authService.requestVc({
          name,
          country,
          did,
        });
        this.vcs.push(response.data);

        // save the Verifiable credentials to local storage
        localStorage.setItem("vc", JSON.stringify(this.vcs));
        // this.customerCredential = this.vcs.map((jwt) => retrieveCredentials(jwt))

        this.customerCredential = PresentationExchange.selectCredentials({
          vcJwts: this.vcs,
          presentationDefinition: this.offering.data.requiredClaims,
        });

        this.vcstep = 2;
        const messageStore = useMessageStore();
        messageStore.setStage("ENTER AMOUNT");
      } catch (error) {
        handleErrors(error);
      } finally {
        this.isVcLoading = false;
      }
    },

    async requestQuote(amount) {
      /// now we have all the details to request for quote, I think
      this.amount = amount;
      this.loading = true;
      this.loadingMessage = "Creating Order...";

      try {
        const rfq = Rfq.create({
          metadata: {
            to: this.offering.metadata.from,
            from: this.did.uri,
            protocol: PROTOCOL,
          },
          data: {
            offeringId: this.offering.metadata.id,
            payin: {
              kind: this.offering.data.payin.methods[0].kind,
              amount: this.amount,
              paymentDetails: {
                accountNumber: "123456789",
                routingNumber: "123455533",
              },
            },
            payout: {
              kind: this.offering.data.payout.methods[0].kind,
              paymentDetails: {
                accountNumber: "123456789",
                IBAN: "1323233234",
              },
            },
            claims: this.customerCredential,
          },
        });

        localStorage.setItem("rfq", JSON.stringify(rfq));

        this.rfq = rfq;

        await rfq.sign(this.did);

        await TbdexHttpClient.createExchange(rfq);



        this.order = Order.create({
          metadata: {
            from: this.did.uri,
            to: this.offering.metadata.from,
            exchangeId: rfq.exchangeId,
            protocol: PROTOCOL,
          },
        });

        this.loading = false;

        const messageStore = useMessageStore();
        messageStore.addMessage(
          "SELLER",
          "Order created succcessfully, find the details of your order below: ",
          "text"
        );

        messageStore.addMessage("", "", "order");
      } catch (error) {
        handleErrors(error);
        this.loading = false;
      }
    },

    //
    async submitOrder() {
      // handle submit order
      this.loading = true;
      this.loadingMessage = "Submitting order..";

      try {
        const order = Order.create({
          metadata: {
            from: this.did.uri,
            to: this.offering.metadata.from,
            exchangeId: this.rfq.exchangeId,
            protocol: PROTOCOL,
          },
        });

        await order.sign(this.did);

        const response = await TbdexHttpClient.submitOrder(order);
        this.loading = false;

        const messageStore = useMessageStore();

        messageStore.addMessage(
          "SELLER",
          "Order submitted successfully. You can track the status of your order on the transaction page",
          "text"
        );

        // setTimeout(() => {
        //   this.isRating = true;
        // }, 2000);
      } catch (error) {
        handleErrors(error);
        this.loading = false;
      }
    },

    async closeOrder(reason) {
      console.log(reason);

      // handle cancel order
      this.reason = reason;
      this.loading = true;
      this.loadingMessage = "Cancelling order..";

      const close = Close.create({
        metadata: {
          from: this.did.uri,
          to: this.offering.metadata.from,
          exchangeId: this.rfq.exchangeId,
          protocol: PROTOCOL,
        },
        data: {
          reason,
        },
      });

      try {
        await close.sign(this.did);

        await TbdexHttpClient.submitClose(close);

        this.loading = false;
        const messageStore = useMessageStore();
        messageStore.addMessage(
          "SELLER",
          "Order cancelled successfully. This chat will self-destruct in 3,2,1...",
          "text"
        );
        setTimeout(() => location.reload(), 3000);
      } catch (error) {
        this.loading = false;
        handleErrors(error);
      }
    },
  },
});
