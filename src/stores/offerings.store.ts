import { defineStore } from "pinia";
import pfiData from "../pfis/pfis.json";
import { Offering, Rfq, TbdexHttpClient } from "@tbdex/http-client";
import { handleErrors } from "@/utils/handlers";
import offeringsService from "@/services/offerings/offeringsService";
import { useMessageStore } from "./message.store";
import { BearerDid, DidDht } from "@web5/dids";
import { Jwt, PresentationExchange } from "@web5/credentials";
import { retrieveCredentials } from "@/utils/credentials";
import { sendMessage } from "./client";

export const useOfferingsStore = defineStore("offeringStore", {
  state: () => ({
    currencypair: "",
    isVcActive: false,
    loading: false,
    offerings: [] as Offering[],
    isVcLoading: false,
    vcstep: 1,
    vcs: (JSON.parse(localStorage.getItem("vc")) as string[]) || [],
    offering: Offering,
    customerCredential: [] as string[],
    amount: "",
    did: BearerDid,
    rfq: Rfq,
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
          const fetchedOfferings = await offeringsService.getOfferings(did);

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
          "text"
        );

        messageStore.addMessage("", "", "offers");
      } catch (error) {
        handleErrors(error.message);
      }
    },

    selectOffer(offer) {
      this.offering = offer;

      // check if the customer has a VC, if they don't request for one
      if (this.customerCredential.length) {
        const messageStore = useMessageStore();
        messageStore.addMessage(
          "Seller",
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

    async requestVc(user) {
      this.isVcLoading = true;
      const { name, country } = user;
      //request did for user here

      //TODO: move did request to first instance of signing on to the platform
      try {
        this.did = await DidDht.create({
          options: {
            publish: true,
          },
        });
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
        const messageStore = useMessageStore();
        messageStore.setStage("ENTER AMOUNT");
      } catch (error) {
        console.log(error);
        handleErrors(error.message);
      } finally {
        this.isVcLoading = false;
      }
    },

    async requestQuote(amount) {
      /// now we have all the details to request for quote, I think
      this.amount = amount;

      console.log("the did", this.did.uri);
      console.log("the offering", this.offering);

      try {
        const rfq = Rfq.create({
          metadata: {
            to: this.offering.metadata.from, // PFI's DID
            from: this.did.uri, // Customer DID
            protocol: "1.0", // Version of tbDEX protocol you're using
          },
          data: {
            offeringId: this.offering.metadata.id, // The ID of the selected offering
            payin: {
              kind: this.offering.data.payin.methods[0].kind, // The method of payment
              amount: this.amount, // The amount of the payin currency
              paymentDetails: {
                accountNumber: "123456789",
                routingNumber: "123455533"
              },
            },
            payout: {
              kind: this.offering.data.payout.methods[0].kind, // The method for receiving payout
              paymentDetails: {
                accountNumber: '123456789',
                IBAN: '1323233234'
              }, // Details required to execute payment
            },
            claims: this.customerCredential, // Array of signed VCs required by the PFI
          },
        });

        await rfq.sign(this.did);

        // await rfq.sign(this.did);
        const requestBody = JSON.stringify({ message: rfq })
        console.log(requestBody)
        const response = await sendMessage(this.offering.metadata.id, 'POST', `/exchanges`, requestBody)

        console.log("exchange", response);
      } catch (error) {
        handleErrors(error.message);
      }
    },

    //
    createExchange() {},

    cancelRfq() {},
  },
});
