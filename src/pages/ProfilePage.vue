<template>
  <v-main class="profile-container">
    <h4 class="ml-6">Profile</h4>
    <div class="text-center">
      <v-avatar :size="120">
        <v-icon
          v-if="!user?.image"
          :size="120"
          icon="mdi-account-circle"
        ></v-icon>
        <v-img v-if="user?.image" :size="120" :src="user?.image"></v-img>
      </v-avatar>
    </div>

    <div class="mx-6">
      <Avatars />

      <Theme />
      <AccountInfo />

      <SubscriptionDetails />

      <Security />
    </div>
  </v-main>
</template>

<script>
import AccountInfo from "@/components/Profile/AccountInfo.vue";
import Avatars from "@/components/Profile/AvatarsImage.vue";
import Security from "@/components/Profile/SecurityComponent.vue";
import Theme from "@/components/Profile/ThemeComponent.vue";
import { useUserStore } from "@/stores/user.store";
import { mapState } from "pinia";
import SubscriptionDetails from "@/components/Profile/SubscriptionDetails.vue";

export default {
  components: { AccountInfo, Security, Avatars, Theme, SubscriptionDetails },
  computed: {
    ...mapState(useUserStore, {
      user: "user",
    }),
  },
};
</script>

<style scoped>
.profile-container {
  margin: 20px 0px;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}
</style>
