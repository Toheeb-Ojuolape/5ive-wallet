<template>
  <div class="transaction-container">
    <v-btn icon @click="goBack" flat>
      <v-icon> mdi-chevron-left</v-icon>
    </v-btn>
    <h3 class="my-3">Transaction details</h3>
    <v-card v-if="transaction" class="rounded-xl pa-6 my-4" flat>
      <div class="d-flex">
        <h2>
          {{ transaction[1]?.data.payin.currencyCode }}
          {{ formattedAmount(transaction[1]?.data.payin.amount) }}
        </h2>
        <v-icon class="mt-1 mx-2">mdi-sync</v-icon>
        <h2>
          {{ transaction[1]?.data.payout.currencyCode }}
          {{ formattedAmount(transaction[1]?.data.payout.amount) }}
        </h2>
      </div>
      <p style="font-size: 18px; margin: 0px 0px 10px 0px">
        with <strong>{{ pfiName(transaction[1]) }}</strong>
      </p>

      <span style="font-size: 14px"
        >created at:
        {{ getTransactionDate(transaction[0]?.metadata.createdAt) }}</span
      >
    </v-card>

    <v-card v-if="transaction" flat class="rounded-xl pa-3">
      <VerticalSteps :steps="transaction" />
    </v-card>

    <OverlayLoader :loading="!transaction" :text="'Fetching transaction details'"/>
  </div>
</template>

<script>
import VerticalSteps from "@/elements/Transaction/VerticalSteps.vue";
import { useTransactionStore } from "@/stores/transactions.store";
import { formatAmount, getDate, getPFIName } from "@/utils/formatter";
import { mapState } from "pinia";
import OverlayLoader from '@/elements/Loader/OverlayLoader.vue';

export default {
  components: { VerticalSteps, OverlayLoader },

  setup() {
    const transactionStore = useTransactionStore();
    return { transactionStore };
  },

  computed:{
    ...mapState(useTransactionStore, {
      transaction: 'transaction'
    })
  },

  created() {
    this.transactionStore.fetchSingleTransaction(
      this.$route.query.pfi,
      this.$route.params.id
    );
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },

    formattedAmount(amount) {
      return formatAmount(parseFloat(amount));
    },

    pfiName(offering) {
      return getPFIName(offering);
    },

    getTransactionDate(date) {
      return getDate(date);
    },
  },
};
</script>

<style scoped>
.transaction-container {
  margin: 20px 0px;
  width: 100%;
  height: 90vh;
  overflow-y: auto;
  padding: 0px 20px;
}
</style>
