import { Currency } from "@/interfaces/currency";
import { defineStore } from "pinia";
import router from "@/router";
import { CURRENCY, DEFAULTCURRENCY } from "@/constants/constant";
import { handleErrors, handleSuccess } from "@/utils/handlers";
import { Offering, Rfq, TbdexHttpClient } from "@tbdex/http-client";
import pfiData from "../pfis/pfis.json";
import { currentDateTime, formatAmount, getPFIName } from "@/utils/formatter";
import { PresentationExchange } from "@web5/credentials";
import offeringsService from "@/services/offeringsService";
import authService from "@/services/authService";

export const useSwapStore = defineStore("swapStore", {
  state: () => ({
    loading: false,
    loadingMessage: "",
    selectcurrency: false,
    currency: CURRENCY as Currency,
    defaultcurrency: DEFAULTCURRENCY as Currency,
    receiverAmount: "",
    offerings: [] as Offering[],
    bestOffer: null,
    isSubmitLoading: false,
    vcs: (JSON.parse(localStorage.getItem("vc")) as string[]) || [],
    customerCredential: [] as string[],
    amount: "",
    rfq: Rfq,
    reason: "",
    isRating: false,
    vcstep: 1,
    isVcActive: false,
    isVcLoading: false,
    swapStep: 1,
    isCancel: false,
  }),

  actions: {
    setShowSelectCurrency() {
      this.selectcurrency = !this.selectcurrency;
    },
    setCurrency(currency) {
      this.currency = currency;
      router.push("/swap");
    },

    toggleVc() {
      this.isVcActive = !this.isVcActive;
    },

    async fetchBestOffering(senderInput) {
      const { amount, from, to } = senderInput;
      this.amount = amount;

      if (this.bestOffer) {
        this.receiverAmount = formatAmount(
          amount * parseFloat(this.bestOffer.data.payoutUnitsPerPayinUnit)
        );
        return;
      }

      this.loading = true;
      this.loadingMessage = "Fetching best available offer";
      let offering = from + " to " + to;

      try {
        const allOfferings = await offeringsService.fetchOfferings(offering);
        this.offerings = allOfferings.filter(
          (offering) =>
            offering.data.payin.currencyCode === from &&
            offering.data.payout.currencyCode === to
        );

        this.loading = false;
        if (!this.offerings.length) {
          return handleErrors({
            message:
              "No offers available for this currency pair. Please try another",
          });
        }

        this.bestOffer = this.offerings.sort(
          (a, b) =>
            parseFloat(a.data.payoutUnitsPerPayinUnit) -
            parseFloat(b.data.payoutUnitsPerPayinUnit)
        )[0];

        this.receiverAmount = formatAmount(
          amount * parseFloat(this.bestOffer.data.payoutUnitsPerPayinUnit)
        );
      } catch (error) {
        this.loading = false;
        handleErrors(error);
      }
    },

    resetOffer() {
      this.bestOffer = null;
    },

    async requestVc(user) {
      this.isVcLoading = true;
      const { name, country } = user;
      try {
        authService.setUser(user);
        const did = await authService.getDid();
        const response = await authService.requestVc({
          name,
          country: country.code,
          did: did,
        });

        this.vcs.push(response.data);
        localStorage.setItem("vc", JSON.stringify(this.vcs));
        this.customerCredential = PresentationExchange.selectCredentials({
          vcJwts: this.vcs,
          presentationDefinition: this.bestOffer.data.requiredClaims,
        });

        this.vcstep = 2;
      } catch (error) {
        handleErrors(error);
      } finally {
        this.isVcLoading = false;
      }
    },

    async submitSwap(paymentDetails, payin) {
      try {
        this.isSubmitLoading = true;

        const did = await authService.getDid();

        if (this.vcs.length) {
          this.customerCredential = PresentationExchange.selectCredentials({
            vcJwts: this.vcs,
            presentationDefinition: this.bestOffer.data.requiredClaims,
          });
        } else if (
          authService.getUser().name &&
          authService.getUser().country
        ) {
          const vc = await authService.requestVc({
            name: authService.getUser().name,
            country: authService.getUser().country.code,
            did,
          });

          this.vcs.push(vc.data);
          localStorage.setItem("vc", JSON.stringify(this.vcs));
          this.customerCredential = PresentationExchange.selectCredentials({
            vcJwts: this.vcs,
            presentationDefinition: this.bestOffer.data.requiredClaims,
          });
        } else {
          this.isVcActive = true;
          this.isSubmitLoading = false;
          return;
        }

        const response = await offeringsService.requestQuote(
          this.bestOffer,
          did,
          this.amount.toString(),
          payin,
          paymentDetails,
          this.customerCredential
        );
        this.rfq = response.rfq;

        this.isSubmitLoading = false;
        this.swapStep = 2;
      } catch (error) {
        handleErrors(error);
        this.isSubmitLoading = false;
      }
    },

    async closeOrder(reason) {
      try {
        this.reason = reason;
        this.loading = true;
        this.loadingMessage = "Cancelling order..";
        const did = await authService.getDid();

        await offeringsService.cancelOrder(
          this.bestOffer,
          did,
          this.rfq,
          reason
        );
        this.loading = false;
        handleSuccess("Order closed successfully");
        setTimeout(() => location.reload(), 3000);
      } catch (error) {
        this.loading = false;
        handleErrors(error);
      }
    },

    async submitOrder() {
      try {
        this.loading = true;
        this.loadingMessage = "Submitting order..";
        const did = await authService.getDid();
        await offeringsService.submitOrder(this.bestOffer, did, this.rfq);
        this.loading = false;
        this.swapStep = 3;
        authService.setNotification({
          title: "Swap order created successfully",
          message: `You have successfully created an order to swap ${
            this.bestOffer.data?.payin.currencyCode
          } ${formatAmount(parseFloat(this.amount))} for ${
            this.bestOffer.data?.payout.currencyCode
          } ${this.receiverAmount} with ${getPFIName(this.bestOffer)}`,
          time: currentDateTime(),
          status: false,
        });
      } catch (error) {
        this.loading = false;
        handleErrors(error);
      }
    },
  },
});
