<template>
  <div>Hello</div>
</template>

<script>
import { useTransactionStore } from "@/stores/transactions.store";

export default {
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
