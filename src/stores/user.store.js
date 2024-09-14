import authService from "@/services/authService";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    notifications: JSON.parse(
      localStorage.getItem("notifications")
    ),
  }),

  getters: {
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
    setUser(data) {
      authService.setUser(data);
      this.user = { ...this.user, ...data };
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
  },
});
