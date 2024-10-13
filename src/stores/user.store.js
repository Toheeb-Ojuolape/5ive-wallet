import { BRANDCOLOR } from "@/constants";
import authService from "@/services/authService";
import { handleErrors } from "@/utils/handlers";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    notifications: JSON.parse(localStorage.getItem("notifications")),
    vcs: JSON.parse(localStorage.getItem("vc")) || [],
    themecolor: localStorage.getItem("theme-color") || BRANDCOLOR,
  }),

  getters: {
    isSubscribed() {
      return this.user && this.user?.isSubscribed;
    },

    getUnreadNotification() {
      return (
        this.notifications &&
        this.notifications.filter((notification) => !notification.status).length
      );
    },

    getNotifications() {
      return this.notifications && this.notifications.reverse();
    },
  },
  actions: {
    async setUser(data) {
      await authService.setUser(data);
      this.user = { ...this.user, ...data };
    },

    setThemeColor(color) {
      this.themecolor = color;
      localStorage.setItem("theme-color", color);
    },

    viewNotifications() {
      this.notifications =
        this.notifications &&
        this.notifications.map((item) => {
          return {
            ...item,
            status: true,
          };
        });

      localStorage.setItem("notifications", JSON.stringify(this.notifications));
    },

    async requestVc(user) {
      const { name, country } = user;
      try {
        await authService.setUser(user);
        const did = await authService.getDid();
        const response = await authService.requestVc({
          name,
          country: country,
          did: did,
        });

        this.vcs.push(response?.data);
        localStorage.setItem("vc", JSON.stringify(this.vcs));
      } catch (error) {
        handleErrors(error);
      }
    },
  },
});
