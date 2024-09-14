<template>
  <div class="stats-container">
    <StatOverview />
    <PayinStats />
    <PayoutStats />
    <PFIStats />
    <PremiumFeature
      :isActive="isPremium && !isSubscribed"
      @closeBtn="isPremium = false"
      :title="'Wallet Insights'"
      :features="INSIGHTSFEATURES"
    />
  </div>
</template>

<script>
import PayinStats from "@/components/Statistics/PayinStats.vue";
import PayoutStats from "@/components/Statistics/PayoutStats.vue";
import PFIStats from "@/components/Statistics/PFIStats.vue";
import StatOverview from "@/components/Statistics/StatOverview.vue";
import PremiumFeature from "@/components/Modal/PremiumFeature.vue";
import { INSIGHTSFEATURES } from "@/constants/constant";
import { useTransactionStore } from "@/stores/transactions.store";
import { useUserStore } from "@/stores/user.store";
import { mapState } from "pinia";

export default {
  components: {
    StatOverview,
    PayinStats,
    PayoutStats,
    PFIStats,
    PremiumFeature,
  },
  setup() {
    const transactionStore = useTransactionStore();
    return {
      transactionStore,
    };
  },

  computed: {
    ...mapState(useUserStore, {
      isSubscribed: "isSubscribed",
    }),
  },

  data() {
    return {
      INSIGHTSFEATURES,
      isPremium: true,
    };
  },

  created() {
    this.transactionStore.fetchTransactions();
  },
};
</script>

<style scoped>
.stats-container {
  margin: 20px 0px;
  width: 100%;
  height: 90vh;
  overflow-y: auto;
  padding: 0px 20px;
}
</style>
