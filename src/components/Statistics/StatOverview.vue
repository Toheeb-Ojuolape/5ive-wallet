<template>
  <v-card class="rounded-xl px-6 py-6" flat>
    <h3>Overview</h3>
    <div class="overview-container">
      <div v-for="(amount, i) in balance" :key="i">
        <CurrencyCard :value="amount" />
      </div>
    </div>
  </v-card>
</template>

<script>
import { useTransactionStore } from "@/stores/transactions.store";
import CurrencyCard from "@/elements/Statistics/CurrencyCard.vue";
import { mapState } from "pinia";

export default {
  components: {
    CurrencyCard,
  },
  computed: {
    ...mapState(useTransactionStore, {
      balance: "balance",
      loading: "loading",
    }),
  },
};
</script>

<style scoped>
.overview-container{
  display: flex;
  flex: 1;
  overflow-x: auto;
  gap: 10px
}
</style>
