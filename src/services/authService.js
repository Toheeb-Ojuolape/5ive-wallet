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

  syncDid(file) {
    let did;
    if (file.type !== "application/json") {
      handleErrors({
        message: "Please upload a valid JSON file containing your DID",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        did = JSON.parse(e.target.result);
        localStorage.setItem("customerDid", JSON.stringify(did));
         // query your DWN here with your did and set the did
      } catch (error) {
        console.log(error);
        handleErrors(error);
      }
    };

    reader.readAsText(file);
    
    
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

  getNextSubscriptionDueDate(date) {
    const millisecondsInOneYear = 365 * 24 * 60 * 60 * 1000 + date;
    return getDate(millisecondsInOneYear);
  },
};
