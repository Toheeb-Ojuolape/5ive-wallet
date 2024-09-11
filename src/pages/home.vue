<template>
    <DashboardWallet @selectCurrency="selectCurrency" />
    <div class="pa-3">
      <QuickActions />
      <RecentTransactions />
      <SelectCurrency
        :isActive="selectcurrency"
        @closeBtn="closeBtn"
        @setCurrency="setCurrency"
      />
    </div>
  </template>
  
  <script>
  import { useSwapStore } from "@/stores/swap.store";
  import { storeToRefs } from "pinia";
  import SelectCurrency from "@/elements/SelectCurrency.vue";
  
  export default {
    components:{ SelectCurrency},
    setup() {
      const swapStore = useSwapStore();
      const { selectcurrency } = storeToRefs(swapStore);
      return {
        swapStore,
        selectcurrency,
      };
    },
  
    methods:{
      selectCurrency(){
        this.swapStore.setShowSelectCurrency()
      },
  
      closeBtn(){
        this.selectcurrency = false
      },
  
      setCurrency(currency) {
        this.swapStore.setCurrency(currency)
      }
    }
  
    
  };
  </script>
  