<template>
  <v-card color="#f8fafc" flat class="currency-card">
    <div
      style="width: 20px; height: 20px"
      :class="`fi fi-${getCountryName(value.currencyCode)}`"
    ></div>
    <h2 class="my-3">
      {{ value.currencyCode }}
      {{ formattedAmount(value.amount) }}
    </h2>
  </v-card>
</template>

<script>
import { formatAmount, getCountry } from "@/utils/formatter";

export default {
  props: {
    value: {
      type: Object,
    },
  },

  methods: {
    getCountryName(code) {
      return getCountry(code);
    },

    formattedAmount(amount) {
      return formatAmount(amount);
    },
  },
};
</script>

<style scoped>
.currency-card {
  padding: 15px 20px;
  width: 200px;
  border-radius: 20px;
  margin: 6px 0px

}
</style>
