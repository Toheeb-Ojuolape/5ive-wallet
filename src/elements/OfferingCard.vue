<template>
  <v-card rounded="xl" flat class="pa-6 pt-4 my-3" width="300px" min-height="250px">
    <div v-if="index === 0" class="d-flex justify-end">
      <v-chip size="small">Recommmended</v-chip>
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
      >{{ offering.data.payoutUnitsPerPayinUnit }}
    </div>

    <div class="my-3">
      <div><strong>Payment Methods</strong></div>
      <div v-for="(method,i) in offering.data.payin.methods" :key="i">
        <v-chip label size="small">{{ method.kind }}</v-chip>
      </div>
    </div>

    <v-btn @click="selectOffer(offering)" block variant="outlined" rounded="pill">
      Request Quote</v-btn
    >
  </v-card>
</template>

<script>
import { Offering } from "@tbdex/http-client";
import ExchangeRate from "./ExchangeRate.vue";
import { useOfferingsStore } from '@/stores/offerings.store';
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
    pfiName(offering){
      return getPFIName(offering)
    },
    
    selectOffer(offer) {
        const offeringsStore = useOfferingsStore();
        offeringsStore.selectOffer(offer); 
    },
  },
};
</script>
