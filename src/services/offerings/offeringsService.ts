import axios from "axios";
import { handleErrors } from "@/utils/handlers";
import { DidServiceEndpoint } from "@web5/dids";
import { TbdexHttpClient } from "@tbdex/http-client";

export default {
  async getOfferings(did) {
    try {
      // first create the url for the offering
      const response: DidServiceEndpoint | DidServiceEndpoint[] =
        await TbdexHttpClient.getPfiServiceEndpoint(did);

      const endpoint = Array.isArray(response) ? response : [response];

      const apiRoute: string = `${endpoint}/offerings`;
      const offers = await axios.get(apiRoute);
      return offers.data.data;
    } catch (error) {
      handleErrors(error);
    }
  },

  async requestVc({ name, country, did }) {
    try {
      const response = await axios.get(
        `https://mock-idv.tbddev.org/kcc?name=${name}&country=${country}&did=${did}`
      );
      console.log(response);
      return response
    } catch (error) {
      handleErrors(error.message);
    }
  },
};
