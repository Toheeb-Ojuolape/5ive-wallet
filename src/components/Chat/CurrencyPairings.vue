<template>
  <div class="currency-pairs">
    <div v-for="(currency, i) in CURRENCYPAIRS" :key="i">
      <v-btn
        @click="setCurrencyPair(currency)"
        style="font-size: 14px"
        flat
        rounded="pill"
        label
        size="large"
        :class="currency === currencypair ? 'selected' : ''"
      >
        <span
          style="width: 10px; border-radius: 50%"
          :class="`fi fi-${getCountryValue(currency.from)}`"
        ></span>
        {{ currency.from }}
        <v-icon size="small" icon="mdi-arrow-right"></v-icon>
        <span
          style="width: 10px; border-radius: 50%"
          :class="`fi fi-${getCountryValue(currency.to)}`"
        ></span>
        {{ currency.to }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { CURRENCYPAIRS } from "@/constants/constant";
import { getCountry } from "@/utils/formatter";
import { mapState } from "pinia";
import { useOfferingsStore } from "@/stores/offerings.store";

export default {
  data() {
    return {
      CURRENCYPAIRS,
    };
  },

  computed: {
    ...mapState(useOfferingsStore, {
      currencypair: "currencypair",
    }),
  },

  setup() {
    const offeringStore = useOfferingsStore();

    const setCurrencyPair = (currency) => {
      offeringStore.setCurrencypair(currency);
    };

    return {
      setCurrencyPair,
    };
  },

  methods: {
    getCountryValue(country: string) {
      return getCountry(country);
    },
  },
};
</script>

<style scoped>
.currency-pairs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 10px;
}

.selected {
  background: #ecfaff;
}
</style>
