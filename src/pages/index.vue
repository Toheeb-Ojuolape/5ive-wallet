<template>
  <DashboardWallet @selectCurrency="selectCurrency" />
  <div class="pa-3">
    <QuickActions />
    <RecentTransactions />
    <SelectCurrency :isActive="selectcurrency" @closeBtn="selectCurrency" @setCurrency="setCurrency"/>
  </div>
</template>

<script lang="ts" setup>
import { useSwapStore } from "@/stores/swap.store";
import { storeToRefs } from "pinia";
import SelectCurrency from "@/elements/SelectCurrency.vue";

const swapStore = useSwapStore();
const { selectcurrency } = storeToRefs(swapStore);
function selectCurrency() {
  swapStore.setShowSelectCurrency();
}

function setCurrency(currency){
  console.log('from ui', currency)
  swapStore.setCurrency(currency);
}
</script>
