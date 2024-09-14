<template>
  <div class="history-container">
    <div class="ml-6">
      <h4>Activity</h4>

      <!-- <div class="drop-down">
        <DropDown
          :type="'status'"
          :items="STATUS"
          @handleFilter="handleFilter"
        />
      </div> -->
    </div>

    <Transaction :length="transactions.length" />
  </div>
</template>

<script>
import Transaction from "@/components/History/TransactionComponent.vue";
// import DropDown from "@/elements/DropDown.vue";
import { useTransactionStore } from "@/stores/transactions.store";
import { mapState } from "pinia";

export default {
  components: {
    // DropDown,
    Transaction,
  },
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
      STATUS: ["TRANSFERING_FUNDS", "IN_PROGRESS", "SUCCESS"],
    };
  },

  methods: {
    handleFilter(e) {
      this.transactionStore.filterTransactions(e);
    },
  },
};
</script>

<style scoped>
.transaction-sheet {
  border-radius: 50px 50px 0px 0px;
  margin: 20px 0px 0px 0px;
  padding: 10px 15px 90px 15px;
  height: 90vh;
  overflow-y: auto;
}

.history-container {
  margin: 20px 0px;
  width: 100%;
}

.drop-down {
  margin: 10px 0px;
}

.drop-down > * {
  margin: 0px 10px 0px 0px;
}
</style>
