import { defineStore } from "pinia";
import pfiData from "../pfis/pfis.json";
import { Offering } from "@tbdex/http-client";
import { handleErrors } from "@/utils/handlers";
import offeringsService from "@/services/offerings/offeringsService";
import { useMessageStore } from "./message.store";
import { currentTime } from "@/utils/formatter";
import { DidDht } from "@web5/dids";

export const useOfferingsStore = defineStore("offeringStore", {
  state: () => ({
    currencypair: "",
    isVcActive: false,
    loading: false,
    offerings: [] as Offering[],
  }),

  actions: {
    setCurrencypair(currencypair: string) {
      this.currencypair = currencypair;
      this.fetchOfferings();
    },

    async fetchOfferings() {
      this.loading = true;
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
          const fetchedOfferings = await offeringsService.fetchOfferings(did);

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
          "Seller",
          `We found ${this.offerings.length} offer${
            this.offerings.length > 1 ? "s" : ""
          } matching your currency pair request`,
          currentTime(),
          "text"
        );

        messageStore.addMessage("", "", currentTime(), "offers");
      } catch (error) {
        handleErrors(error.message);
      }
    },

    selectOffer(offer) {
      this.offer = offer;
      this.toggleVc();
    },

    toggleVc() {
      this.isVcActive = !this.isVcActive;
    },

    async requestQuote(user) {
      this.btnloading = true;
      const { name, country } = user;
      //request did for user here
      //TODO: move did request to first instance of signing on to the platform
      try {
        const did = await DidDht.create({
          options: {
            publish: true,
          },
        });
        await offeringsService.requestVc({ name, country, did });
      } catch (error) {
        handleErrors(error.message);
      } finally{
        this.btnloading = false
      }
    },
  },
});
