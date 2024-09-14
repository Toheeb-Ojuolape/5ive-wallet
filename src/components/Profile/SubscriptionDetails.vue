<template>
  <v-card flat class="pa-4 my-4 rounded-lg">
    <h4>Subscription</h4>

    <div>
      <div class="my-3">
       Membership: <v-chip :disabled="!user?.isSubscribed" :class="user?.isSubscribed ? 'active' : 'inactive'">
          {{ user && user?.isSubscribed ? "Premium" : "Not subscribed" }}</v-chip
        >
      </div>
      <div v-if="user?.isSubscribed">
        Next payment due: {{ getNextDue(user?.subscriptionDate) }}
      </div>
    </div>
  </v-card>
</template>

<script>
import authService from "@/services/authService";
import { useUserStore } from "@/stores/user.store";
import { mapState } from "pinia";
export default {
  computed: {
    ...mapState(useUserStore, {
      user: "user",
    }),
  },

  methods: {
    getNextDue(date) {
      return authService.getNextSubscriptionDueDate(date);
    },
  },
};
</script>

<style scoped>
.subscription-form {
  margin: 20px 0px 10px 0px;
  padding: 0px 10px;
}

.profile-form > * {
  margin: 25px 0px;
}

.active {
  color: #32c36c;
  background: #ecfff6;
}
</style>
