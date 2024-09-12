<template>
  <div class="transaction-card">
    <div class="d-flex">
    <div>
      <v-btn icon>
        <v-icon> {{ getTransactionIconValue(transaction?.kind) }}</v-icon>
      </v-btn>
      </div>

      <div class="ml-3">
        <h3>{{ pfiName(transaction) }}</h3>
        <span style="font-size:14px">kind: {{ transaction?.kind }} </span>
        <div class="date">{{ getDateValue(transaction?.metadata.createdAt) }}</div>
      </div>

    </div>
    <div>
      

      <div class="text-end">
        <h3>{{ transaction?.data.payin?.amount || "" }}</h3>
        <v-chip
          :class="transaction?.data.orderStatus"
          v-if="transaction?.data.orderStatus"
          label
          size="small"
          >{{ transaction?.data.orderStatus || "" }}</v-chip
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getDate, getPFIName, getTransactionIcon} from "@/utils/formatter";

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

    getTransactionIconValue(kind){
        return getTransactionIcon(kind)
    }
  },
};
</script>

<style scoped>
.transaction-card {
  border-bottom: 1px solid #9ba3a6;
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
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

.date{
    font-size: 10px
}

h3{
    margin:-5px 0px;
    padding: 0px;
    font-size: 17px
}
</style>
