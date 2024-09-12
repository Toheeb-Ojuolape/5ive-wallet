<template>
  <v-sheet class="transaction-sheet">
    <div v-if="loading">
      <div v-for="(_, i) in length" :key="i">
        <TransactionCardLoading />
      </div>
    </div>

    <div v-if="!loading">
      <div v-for="(transaction, i) in transactions.slice(0,length)" :key="i">
        <TransactionCard :transaction="transaction" />
      </div>
    </div>

    <div v-if="!loading && !transactions.length">
      <EmptyTransaction />
    </div>
  </v-sheet>
</template>

<script>
import EmptyTransaction from "@/elements/Transaction/EmptyTransaction.vue";
import TransactionCard from "@/elements/Transaction/TransactionCard.vue";
import TransactionCardLoading from "@/elements/Transaction/TransactionCardLoading.vue";
import { useTransactionStore } from "@/stores/transactions.store";
import { mapState } from "pinia";

export default {
  components: { TransactionCard, TransactionCardLoading, EmptyTransaction },

  setup() {
    const transactionStore = useTransactionStore();
    return { transactionStore };
  },

  props: {
    length: {
      type: Number,
    },
  },

  computed: {
    ...mapState(useTransactionStore, {
      transactions: "transactions",
      loading: "loading",
    }),
  },

  created() {
    this.transactionStore.fetchTransactions();
  },
};
</script>

<style scoped>
.transaction-sheet {
  border-radius: 30px 30px 0px 0px;
  margin: 10px 0px 0px 0px;
  padding: 10px 15px 90px 15px;
  /* height: 90vh; */
  overflow-y: auto;
}
</style>
