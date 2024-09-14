<template>
  <div class="stats-container">
    <StatOverview />
    <PayinStats />
    <PayoutStats />
    <PFIStats />
  </div>
</template>

<script>
import PayinStats from "@/components/Statistics/PayinStats.vue";
import PayoutStats from "@/components/Statistics/PayoutStats.vue";
import PFIStats from "@/components/Statistics/PFIStats.vue";
import StatOverview from "@/components/Statistics/StatOverview.vue";
import { useTransactionStore } from "@/stores/transactions.store";

export default {
  components: { StatOverview, PayinStats, PayoutStats, PFIStats },
  setup() {
    const transactionStore = useTransactionStore();
    return {
      transactionStore,
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
