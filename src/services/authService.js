import { getDate } from "@/utils/formatter";
import { handleErrors, handleSuccess } from "@/utils/handlers";
import { DidDht } from "@web5/dids";
import axios from "axios";

const storedDid = localStorage.getItem("customerDid");

export default {
  isAuthenticated() {
    if (storedDid == null) {
      return false;
    }
    return true;
  },
  async getDid() {
    let did;
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
    return did;
  },

  setUser(data) {
    let user = JSON.parse(localStorage.getItem("user") || "{}");

    user = {
      ...user,
      ...data,
    };
    localStorage.setItem("user", JSON.stringify(user));

    handleSuccess("Account updated successfully");
  },

  getUser() {
    return JSON.parse(localStorage.getItem("user") || null);
  },

  async requestVc({ name, country, did }) {
    try {
      const response = await axios.get(
        `https://mock-idv.tbddev.org/kcc?name=${name}&country=${country}&did=${did}`
      );
      return response;
    } catch (error) {
      handleErrors(error);
    }
  },

  setNotification(notification) {
    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    notifications.push(notification);
    localStorage.setItem("notifications", JSON.stringify(notifications));
  },

  getNextSubscriptionDueDate(date){
    const millisecondsInOneYear = 365 * 24 * 60 * 60 * 1000 + date;
    return getDate(millisecondsInOneYear)
  }
};
