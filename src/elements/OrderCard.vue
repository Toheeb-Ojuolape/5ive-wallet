<template>
  <v-card rounded="xl" flat class="pa-6 pt-4 my-3">
    <h3>{{ getPFIName(offering) }}</h3>
    <div>
      <ExchangeRate
        :payin="offering.data.payin.currencyCode"
        :payout="offering.data.payout.currencyCode"
      />
    </div>

    <p class="my-4">
      {{ offering.data.description }}
    </p>

    <div class="my-3">
      <strong>Exchange rate: </strong
      >{{ offering.data.payoutUnitsPerPayinUnit }}
    </div>

    <div class="my-3">
      <div><strong>Payment Methods</strong></div>
      <div v-for="(method, i) in offering.data.payin.methods" :key="i">
        <v-chip label size="small">{{ method.kind }}</v-chip>
      </div>
    </div>

    <div class="button-grid">
      <v-btn @click="closeOrder" variant="outlined" rounded="pill">
        Close Order</v-btn
      >

      <v-btn
        flat
        @click="submitOrder"
        :loading="loading"
        rounded="pill"
        :color="themecolor"
      >
        Submit Order</v-btn
      >
    </div>
  </v-card>
</template>

<script>
import pfis from "@/data/pfis.json";
import ExchangeRate from "./ExchangeRate.vue";
import { useUserStore } from "@/stores/user.store"
export default {
  components: { ExchangeRate },
  setup(){
    const {themecolor} = useUserStore()
    return{
      themecolor
    }
  },
  props: {
    offering: {
      type: Object,
    },
    amount: {
      type: String,
    },
    loading: {
      type: Boolean,
    },
  },

  methods: {
    getPFIName() {
      return pfis.pfis.find((pfi) => pfi.did === this.offering.metadata.from)
        .name;
    },

    closeOrder() {
      this.$emit("closeOrder");
    },

    submitOrder() {
      this.$emit("submitOrder");
    },
  },
};
</script>

<style lang="css">
.button-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
</style>
