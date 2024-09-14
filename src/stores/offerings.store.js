import { defineStore } from "pinia";
import { Offering, Order, Rfq } from "@tbdex/http-client";
import { handleErrors } from "@/utils/handlers";
import { useMessageStore } from "./message.store";
import { PresentationExchange } from "@web5/credentials";
import authService from "@/services/authService";
import offeringsService from "@/services/offeringsService";
import { BearerDid } from "@web5/dids";
import { currentDateTime, formatAmount, getPFIName } from "@/utils/formatter";

export const useOfferingsStore = defineStore("offeringStore", {
  state: () => ({
    currencypair: {},
    isVcActive: false,
    loading: false,
    loadingMessage: "",
    offerings: [],
    isVcLoading: false,
    vcstep: 1,
    vcs: (JSON.parse(localStorage.getItem("vc"))) || [],
    offering: Offering,
    customerCredential: [],
    amount: "",
    rfq: Rfq,
    order: Order,
    isRating: false,
    did: BearerDid,
    isPayout: false,
  }),

  actions: {
    setCurrencypair(currencypair) {
      this.currencypair = currencypair;
      this.fetchOfferings();
    },

    setAmount(amount) {
      this.amount = amount;
      this.isPayout = true;
    },

    async fetchOfferings() {
      this.loading = true;
      this.loadingMessage = "Fetching available offers";
      const offering = this.currencypair.from + " to " + this.currencypair.to;

      try {
        const allOfferings = await offeringsService.fetchOfferings(offering);
        this.offerings = allOfferings.filter(
          (offering) =>
            offering.data.payin.currencyCode === this.currencypair.from &&
            offering.data.payout.currencyCode === this.currencypair.to
        );
        this.loading = false;

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
      // check if the customer has a VC, if they don't request for one
      if (this.vcs.length) {
        this.customerCredential = PresentationExchange.selectCredentials({
          vcJwts: this.vcs,
          presentationDefinition: this.offering?.data.requiredClaims,
        });

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
      this.isRating = false;
    },

    submitRating(rating) {
      const ratings = JSON.parse(localStorage.getItem("rating")) || [];
      ratings.push(rating);
      localStorage.setItem("rating", JSON.stringify(ratings));
    },

    async requestVc(user) {
      this.isVcLoading = true;
      const { name, country } = user;
      try {
        const did = await authService.getDid();
        this.did = did;

        const response = await authService.requestVc({
          name,
          country,
          did,
        });
        this.vcs.push(response.data);
        localStorage.setItem("vc", JSON.stringify(this.vcs));
        this.customerCredential = PresentationExchange.selectCredentials({
          vcJwts: this.vcs,
          presentationDefinition: this.offering?.data.requiredClaims,
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

    async requestQuote(paymentDetails, payin) {
      this.isPayout = false;
      this.loading = true;
      this.loadingMessage = "Creating Order...";
      const did = await authService.getDid();
      this.did = did;

      try {
        const { rfq } = await offeringsService.requestQuote(
          this.offering,
          did,
          this.amount.toString(),
          payin,
          paymentDetails,
          this.customerCredential
        );

        this.loading = false;
        this.rfq = rfq;
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

    async submitOrder() {
      this.loading = true;
      this.loadingMessage = "Submitting order..";

      try {
        await offeringsService.submitOrder(this.offering, this.did, this.rfq);
        const messageStore = useMessageStore();
        messageStore.addMessage(
          "SELLER",
          "Order submitted successfully. You can track the status of your order on your activity page",
          "text"
        );

        authService.setNotification({
          title: "Send order created successfully",
          message: `You have successfully created an order to send ${
            this.offering?.data?.payin.currencyCode
          } ${formatAmount(parseFloat(this.amount))} for ${
            this.offering?.data?.payout.currencyCode
          } ${formatAmount(
            this.amount * this.offering?.data?.payoutUnitsPerPayinUnit
          )} with ${getPFIName(this.offering)}`,
          time: currentDateTime(),
          status: false,
        });

        this.loading = false;
        setTimeout(() => {
          this.isRating = true;
        }, 3500);
      } catch (error) {
        handleErrors(error);
        this.loading = false;
      }
    },

    async closeOrder(reason) {
      this.loading = true;
      this.loadingMessage = "Cancelling order..";

      try {
        await offeringsService.cancelOrder(
          this.offering,
          this.did,
          this.rfq,
          reason
        );

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
