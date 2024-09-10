import { Currency } from "@/interfaces/currency";
import { defineStore } from "pinia";
import router from "@/router";
import { CURRENCY, DEFAULTCURRENCY } from "@/constants/constant";
import { handleErrors } from "@/utils/handlers";
import { Offering, Order, Rfq, TbdexHttpClient } from "@tbdex/http-client";
import pfiData from "../pfis/pfis.json";
import { formatAmount } from "@/utils/formatter";
import { PresentationExchange } from "@web5/credentials";
import offeringsService from "@/services/offerings/offeringsService";
import dwn from "@/utils/dwn";
import { DidDht } from "@web5/dids";

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
    offering: Offering,
    customerCredential: [] as string[],
    amount: "",
    did: "",
    storedDid: localStorage.getItem("customerDid"),
    rfq: Rfq,
    order: Order,
    reason: "",
    isRating: false,
    vcstep: 1,
    isVcActive: false,
    isVcLoading: false,
  }),

  actions: {
    setShowSelectCurrency() {
      this.selectcurrency = !this.selectcurrency;
    },
    setCurrency(currency) {
      this.currency = currency;
      router.push("/swap");
    },

    async fetchBestOffering(senderInput) {
      const { amount, from, to } = senderInput;
      console.log(amount, from, to);

      if (!this.bestOffer) {
        this.loading = true;
        this.loadingMessage = "Fetching best available offer";
        let offering = from + " to " + to;

        const { pfis } = pfiData;
        const selectedPFIs = pfis.filter((pfi) =>
          pfi.offerings.includes(offering)
        );
        const dids = selectedPFIs.map((pfi) => pfi.did);

        const allOfferings: Offering[] = [];
        try {
          for (const did of dids) {
            const fetchedOfferings = await TbdexHttpClient.getOfferings({
              pfiDid: did,
            });

            allOfferings.push(...fetchedOfferings);
          }

          this.offerings = allOfferings.filter(
            (offering) =>
              offering.data.payin.currencyCode === from &&
              offering.data.payout.currencyCode === to
          );

          this.loading = false;

          // if no offers were found for the currency pair
          if (!this.offerings.length) {
            return handleErrors({
              message:
                "No offers available for this currency pair. Try another set",
            });
          }

          //select the best offer with the lowest exchange rate
          this.bestOffer = this.offerings.sort(
            (a, b) =>
              parseFloat(a.data.payoutUnitsPerPayinUnit) -
              parseFloat(b.data.payoutUnitsPerPayinUnit)
          )[0];

          console.log(this.bestOffer);

          this.receiverAmount = formatAmount(
            amount * parseFloat(this.bestOffer.data.payoutUnitsPerPayinUnit)
          );
        } catch (error) {
          this.loading = false;
          console.log(error);
          handleErrors(error);
        }
      } else {
        this.receiverAmount = formatAmount(
          amount * parseFloat(this.bestOffer.data.payoutUnitsPerPayinUnit)
        );
      }
    },

    resetOffer() {
      this.bestOffer = null;
    },

    async requestVc(user) {
      this.isVcLoading = true;
      const { name, country } = user;
      //request did for user here

      //TODO: move did request to first instance of signing on to the platform
      try {
        if (this.storedDid) {
          this.did = await DidDht.import({
            portableDid: JSON.parse(this.storedDid),
          });
        } else {
          const did = await DidDht.create({
            options: { publish: true },
          });
          this.did = did;
          const exportedDid = await did.export();
          await dwn.createDidRecord(exportedDid);

          localStorage.setItem("customerDid", JSON.stringify(exportedDid));
        }

        const response = await offeringsService.requestVc({
          name,
          country,
          did: this.did,
        });

        console.log(this.vcs);
        this.vcs.push(response.data);

        console.log(this.vcs);

        // save the Verifiable credentials to local storage
        localStorage.setItem("vc", JSON.stringify(this.vcs));
        console.log(this.offering);
        // this.customerCredential = this.vcs.map((jwt) => retrieveCredentials(jwt))

        this.customerCredential = PresentationExchange.selectCredentials({
          vcJwts: this.vcs,
          presentationDefinition: this.offering.data.requiredClaims,
        });

        this.vcstep = 2;
      } catch (error) {
        console.log(error);
        handleErrors(error.message);
      } finally {
        this.isVcLoading = false;
      }
    },

    async submitSwap(paymentDetails) {
      try {
        console.log('sb')
        this.isSubmitLoading = true;

        if (!this.storedDid) {
          this.isVcActive = true;
          return 
        }

        try {
          const response = await offeringsService.requestQuote(
            this.bestOffer,
            this.did,
            this.amount,
            paymentDetails,
            this.customerCredential
          );
          console.log(response);
        } catch (error) {
          handleErrors(error);
        }
      } catch (error) {
        handleErrors(error);
      }
    },
  },
});
