<template>
  <div class="history-container">
    <div class="ml-6">
      <h4>History</h4>

      <div class="drop-down">
        <DropDown :type="'type'" :items="TYPES" />

        <DropDown :type="'status'" :items="STATUS" />
      </div>
    </div>

    <v-sheet elevation="2" class="transaction-sheet">
      <div v-if="loading">
        <div v-for="(_, i) in 5" :key="i">
          <TransactionCardLoading />
        </div>
      </div>

      <div v-if="!loading">
        <div v-for="(transaction, i) in transactions" :key="i">
          <TransactionCard :transaction="transaction" />
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import DropDown from "@/elements/DropDown.vue";
import TransactionCard from "@/elements/Transaction/TransactionCard.vue";
import TransactionCardLoading from "@/elements/Transaction/TransactionCardLoading.vue";
import { useTransactionStore } from "@/stores/transactions.store";
import { mapState } from "pinia";

export default {
  components: { TransactionCard, TransactionCardLoading, DropDown },
  setup() {
    const transactionStore = useTransactionStore();

    return {
      transactionStore,
    };
  },

  computed: {
    ...mapState(useTransactionStore, {
      transactions: "transactions",
      loading: "loading",
    }),
  },

  data() {
    return {
      TYPES: ["Rfq", "order", "close", "quote"],
      STATUS: ['TRANSFERING_FUNDS', 'IN_PROGRESS', 'SUCCESS']
    };
  },

  created() {
    this.transactionStore.fetchTransactions();
  },
};
</script>

<style scoped>
.transaction-sheet {
  border-radius: 50px 50px 0px 0px;
  margin: 20px 0px 0px 0px;
  padding: 10px 15px;
  height: 90vh;
}

.history-container {
  margin: 20px 0px;
  width: 100%;
}

.drop-down{
  margin: 10px 0px;
}

.drop-down > * {
  margin: 0px 10px 0px 0px
}
</style>
