<template>
  <div class="transaction-container">
    <v-btn icon @click="goBack" flat>
      <v-icon> mdi-chevron-left</v-icon>
    </v-btn>
    <h3 class="my-3">Transaction details</h3>
    <v-card class="rounded-xl pa-6 my-4" flat>
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
        >created at: {{ getTransactionDate(transaction[0]?.metadata.createdAt) }}</span
      >
    </v-card>

    <v-card flat class="rounded-xl pa-3">
      <VerticalSteps :steps="transaction" />
    </v-card>
  </div>
</template>

<script>
import VerticalSteps from "@/elements/Transaction/VerticalSteps.vue";
import { formatAmount, getDate, getPFIName } from "@/utils/formatter";

export default {
  components: { VerticalSteps },

  data() {
    return {
      steps: [
        { title: "Step 1", description: "This is the description for step 1." },
        { title: "Step 2", description: "This is the description for step 2." },
        { title: "Step 3", description: "This is the description for step 3." },
        { title: "Step 4", description: "This is the description for step 4." },
        { title: "Step 5", description: "This is the description for step 4." },
      ],

      transaction: JSON.parse(sessionStorage.getItem("transaction")),
    };
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
