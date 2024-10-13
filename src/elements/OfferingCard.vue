<template>
  <v-card rounded="xl" flat class="pa-6 pt-4 my-3" width="300px" height="340px">
    <div v-if="index === 0" class="d-flex justify-end">
      <v-chip color="#fbfefd" size="small" style="color: #32c36c"
        >Recommended</v-chip
      >
    </div>
    <div v-if="index !== 0" class="d-flex justify-end">
      <v-chip color="white" size="small" style="color: white"
        >Recommended</v-chip
      >
    </div>
    <h3>{{ pfiName(offering) }}</h3>
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
      >{{offering.data.payin.currencyCode}} {{ offering.data.payoutUnitsPerPayinUnit }} / {{ offering.data.payout.currencyCode }}
    </div>

    <div class="my-3 mb-4">
      <div><strong>Payment Methods</strong></div>
      <div v-for="(method, i) in offering.data.payin.methods" :key="i">
        <v-chip label size="small">{{ method.kind }}</v-chip>
      </div>
    </div>

    <v-btn
      @click="selectOffer(offering)"
      block
      variant="outlined"
      rounded="pill"
    >
      Request Quote</v-btn
    >
  </v-card>
</template>

<script>
import { Offering } from "@tbdex/http-client";
import ExchangeRate from "./ExchangeRate.vue";
import { useOfferingsStore } from "@/stores/offerings.store";
import { getPFIName } from "@/utils/formatter";
export default {
  components: { ExchangeRate },
  props: {
    offering: Offering,
    index: {
      type: Number,
    },
  },

  methods: {
    pfiName(offering) {
      return getPFIName(offering);
    },

    selectOffer(offer) {
      const offeringsStore = useOfferingsStore();
      offeringsStore.selectOffer(offer);
    },
  },
};
</script>

