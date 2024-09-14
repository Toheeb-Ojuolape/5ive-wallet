<template>
  <v-main class="notifications-container">
    <h4>Notifications</h4>

    <div v-if="notifications?.length" class="my-3">
      <div v-for="(notification, i) in notifications" :key="i">
        <Notification
          :title="notification.title"
          :description="notification.message"
          :time="notification.time"
        />
      </div>
    </div>

    <div v-if="!notifications?.length">
      <EmptyNotification />
    </div>
  </v-main>
</template>

<script>
import EmptyNotification from "@/elements/Notification/EmptyNotification.vue";
import Notification from "@/elements/Notification/Notification.vue";
import { useUserStore } from "@/stores/user.store";
import { mapState } from "pinia";

export default {
  components: { EmptyNotification, Notification },
  computed: {
    ...mapState(useUserStore, {
      notifications: "getNotifications",
    }),
  },

  setup() {
    const userStore = useUserStore();
    return { userStore };
  },

  created() {
    this.userStore.viewNotifications();
  },
};
</script>

<style scoped>
.notifications-container {
  margin: 20px 0px;
  width: 100%;
  height: 90vh;
  overflow-y: auto;
  padding: 0px 20px;
}
</style>
