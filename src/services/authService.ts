import { User } from "@/interfaces/user";
import { handleErrors, handleSuccess } from "@/utils/handlers";
import { BearerDid, DidDht } from "@web5/dids";
import axios from "axios";

const storedDid = localStorage.getItem("customerDid");

export default {
  async getDid(): Promise<BearerDid> {
    let did: BearerDid;
    if (storedDid) {
      did = await DidDht.import({
        portableDid: JSON.parse(storedDid),
      });
    } else {
      did = await DidDht.create({
        options: { publish: true },
      });
      const exportedDid = await did.export();
      localStorage.setItem("customerDid", JSON.stringify(exportedDid));
    }
    console.log(did);
    return did;
  },

  setUser(data) {
    let user = JSON.parse(localStorage.getItem("user") || "{}") as User;

    user = {
      ...user,
      ...data,
    };
    localStorage.setItem("user", JSON.stringify(user));

    handleSuccess("Account updated successfully");
  },

  getUser(){
    return JSON.parse(localStorage.getItem("user") || null) as User;
  },

  async requestVc({ name, country, did }) {
    try {
      const response = await axios.get(
        `https://mock-idv.tbddev.org/kcc?name=${name}&country=${country}&did=${did}`
      );
      console.log(response);
      return response;
    } catch (error) {
      handleErrors(error);
    }
  },
};
