import { getDate } from "@/utils/formatter";
import { handleErrors, handleSuccess } from "@/utils/handlers";
import { DidDht } from "@web5/dids";
import axios from "axios";
import api from "../api";

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

  exportDid(did, filename) {
    const dataStr = JSON.stringify(did, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  async syncDid(file) {
    // Ensure the file is a valid JSON file
    if (file.type !== "application/json") {
      handleErrors({
        message: "Please upload a valid JSON file containing your DID",
      });
      return;
    }

    try {
      const did = await new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const parsedDid = JSON.parse(e.target.result);
            resolve(parsedDid);
          } catch (error) {
            reject(new Error("Error parsing JSON file"));
          }
        };

        reader.onerror = () => {
          reject(new Error("Error reading file"));
        };
        reader.readAsText(file);
      });

      localStorage.setItem("customerDid", JSON.stringify(did));

      await this.syncWithDWN(did.uri);
    } catch (error) {
      handleErrors(error);
    }
  },

  async updateRecordinDWN() {
    // make an API call to create/update the user's record in my DWN
    // get and merge all the static datas of rating, user and notifications with the new data first before sending to the endpoint
    // CHORE: there is still an issue with the DWN endpoint on firebase where it doesn't always work, I need to check that out
    const notifications =
      JSON.parse(localStorage.getItem("notifications")) || [];

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const ratings = JSON.parse(localStorage.getItem("rating")) || [];

    const vcs = JSON.parse(localStorage.getItem("vc")) || [];

    const userData = {
      user,
      notifications: [...notifications],
      rating: [...ratings],
      vc: [...vcs],
    };

    try {
      const did = JSON.parse(storedDid);
      const response = await api.post("/create-record", {
        user: did.uri,
        data: userData,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  async syncWithDWN(did) {
    try {
      const response = await api.get("/query-record?user=" + did);

      // set the response to the user's localstorage
      const { rating, notifications, user, vc } = response.data.message[0];

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("rating", JSON.stringify(rating));
      localStorage.setItem("notifications", JSON.stringify(notifications));
      localStorage.setItem("vc", JSON.stringify(vc));
    } catch (error) {
      handleErrors(error);
    }
  },

  async setUser(data) {
    let user = JSON.parse(localStorage.getItem("user") || "{}");

    user = {
      ...user,
      ...data,
    };
    localStorage.setItem("user", JSON.stringify(user));

    await this.updateRecordinDWN();
    handleSuccess("Account updated successfully");
  },

  getUser() {
    return JSON.parse(localStorage.getItem("user") || null);
  },

  async requestVc({ name, country, did }) {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.name || !user.country) {
      this.setUser({ name, country });
    }

    try {
      const response = await axios.get(
        `https://mock-idv.tbddev.org/kcc?name=${name}&country=${country.code}&did=${did}`
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

  async submitRating(rating) {
    const ratings = JSON.parse(localStorage.getItem("rating")) || [];
    ratings.push(rating);
    localStorage.setItem("rating", JSON.stringify(ratings));

    await this.updateRecordinDWN();
  },

  getNextSubscriptionDueDate(date) {
    const millisecondsInOneYear = 365 * 24 * 60 * 60 * 1000 + date;
    return getDate(millisecondsInOneYear);
  },
};
