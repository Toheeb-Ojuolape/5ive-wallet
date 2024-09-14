<template>
  <div>
    <DashboardWallet @selectCurrency="selectCurrency" />
    <div class="home-container">
      <QuickActions />
      <RecentTransactions />
      <SelectCurrency
        :isActive="selectcurrency"
        @closeBtn="closeBtn"
        @setCurrency="setCurrency"
      />
    </div>
  </div>
</template>

<script>
import { useSwapStore } from "@/stores/swap.store";
import { storeToRefs } from "pinia";
import SelectCurrency from "@/elements/SelectCurrency.vue";
import QuickActions from "@/components/Dashboard/QuickActions.vue";
import DashboardWallet from "@/components/Dashboard/DashboardWallet.vue";
import RecentTransactions from "@/components/Dashboard/RecentTransactions.vue";

export default {
  components: { SelectCurrency, QuickActions, DashboardWallet, RecentTransactions},
  setup() {
    const swapStore = useSwapStore();
    const { selectcurrency } = storeToRefs(swapStore);

    return {
      swapStore,
      selectcurrency,
    };
  },

  methods: {
    selectCurrency() {
      this.swapStore.setShowSelectCurrency();
    },

    closeBtn() {
      this.selectcurrency = false;
    },

    setCurrency(currency) {
      this.swapStore.setCurrency(currency);
    },
  },
};
</script>

<style scoped>
.home-container {
  overflow-y: auto;
  padding: 25px;
  height: 55vh
}
</style>
