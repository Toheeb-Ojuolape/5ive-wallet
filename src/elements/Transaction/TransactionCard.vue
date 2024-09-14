<template>
  <div @click="viewTransaction(transaction)" class="transaction-card">
    <div class="d-flex">
      <div>
        <v-btn flat variant="outlined" icon>
          <v-icon> mdi-cube-send </v-icon>
        </v-btn>
      </div>

      <div class="ml-3">
        <h3>{{ pfiName(transaction[0]) }}</h3>
        <div class="date">
          {{
            getDateValue(
              transaction[transaction.length - 1]?.metadata.createdAt
            )
          }}
        </div>
        <v-chip
          :class="transaction[transaction.length - 2]?.data.orderStatus"
          v-if="transaction[transaction.length - 2]?.data.orderStatus"
          label
          size="x-small"
          >{{
            transaction[transaction.length - 2]?.data.orderStatus || ""
          }}</v-chip
        >
      </div>
    </div>
    <div>
      <div class="text-end">
        <div class="payin">
          payin: -{{ transaction[1]?.data.payin?.currencyCode || "" }}
          {{ formattedAmount(transaction[1]?.data.payin?.amount) || "" }}
        </div>
        <span class="payout">
          payout: +{{ transaction[1]?.data.payout?.currencyCode || "" }}
          {{ formattedAmount(transaction[1]?.data.payout?.amount) || "" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { formatAmount, getDate, getPFIName } from "@/utils/formatter";

export default {
  props: {
    transaction: {
      type: Object,
    },
  },

  methods: {
    pfiName(did) {
      return getPFIName(did);
    },

    getDateValue(date) {
      return getDate(date);
    },

    formattedAmount(amount) {
      return formatAmount(parseFloat(amount));
    },

    viewTransaction(transaction) {
      sessionStorage.setItem("transaction", JSON.stringify(transaction));
      this.$router.push("/transaction");
    },
  },
};
</script>

<style scoped>
.transaction-card {
  border-bottom: 1px solid #9ba3a6;
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
}

.IN_PROGRESS {
  color: #ffbb00;
  background: #fddb7746;
}
.SUCCESS {
  color: #32c36c;
  background: #beffd897;
}

.TRANSFERING_FUNDS {
  color: #1275ff;
  background: #cdf2fc;
}

.date {
  font-size: 10px;
}

h3 {
  margin: 0px 0px;
  padding: 0px;
  font-size: 17px;
}

.payout {
  color: #9ba3a6;
  font-size: 12px;
}
</style>
