<template>
    <v-card class="rounded-xl pa-6 my-3" flat>
      <h3>Pay-out statistics</h3>
      <DonutChart :balances="balances" :currencies="currencies" />
    </v-card>
  </template>
  
  <script>
  import DonutChart from "@/elements/Statistics/DonutChart.vue";
  import { useTransactionStore } from "@/stores/transactions.store";
  import { mapState } from "pinia";
  
  export default {
    components: { DonutChart },
    computed: {
      ...mapState(useTransactionStore, {
        balances: "balances",
        currencies: "currencies",
      }),
    },
  };
  </script>
  