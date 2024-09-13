import { User } from "@/interfaces/user";
import authService from "@/services/authService";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) as User,
    notifications: JSON.parse(
      localStorage.getItem("notifications")
    ) as Notification[],
  }),

  getters: {
    getUnreadNotification() {
      return this.notifications && this.notifications.filter((notification) => !notification.status).length;
    },
  },
  actions: {
    setUser(data) {
      authService.setUser(data);
      this.user = { ...this.user, ...data };
    },

    getNotifications() {
      return this.notifications;
    },

    viewNotifications() {
      this.notifications = this.notifications && this.notifications.map((item) => {
        return {
          ...item,
          status: true,
        };
      });

      localStorage.setItem("notifications", JSON.stringify(this.notifications));
    },
  },
});
