<template>
  <div class="bg-black text-center px-9 py-6">
    <div class="d-flex justify-space-between mb-3">
      <v-avatar size="50"
        ><v-img src="../../assets/avatars/avatar1.svg"
      /></v-avatar>
      <v-btn
        density="compact"
        icon="mdi-bell-outline"
        size="x-large"
        class="glass-button"
      />
    </div>

    <div class="glass-container">
      <p class="my-2">Activity Balance</p>

      <CurrencySelector
        :name="'country'"
        :currency="currency"
        @handleInput="handleSelectCountry"
        :classname="'dashboard-currency-selector'"
      />
      <h1 class="dashboard-amount">{{ currency.code }} {{ formattedAmount(amount) }}</h1>
    </div>

    <div class="dashboard-actions">
      <v-btn rounded="pill" size="large" to="/send"> Send</v-btn>
      <v-btn
        @click="selectCurrency"
        rounded="pill"
        size="large"
        variant="outlined"
        append-icon="mdi-flash"
      >
        Swap</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { DEFAULTCURRENCY } from "@/constants/constant";
import CurrencySelector from "@/elements/Currencies/CurrencySelector.vue";
import { Currency } from "@/interfaces/currency";
import { formatAmount } from "@/utils/formatter";
import { defineComponent } from "vue";

export default defineComponent({
  components: { CurrencySelector },
  data() {
    return {
      amount: "1000",
      currency: DEFAULTCURRENCY as Currency,
    };
  },
  methods: {
    selectCurrency() {
      this.$emit("selectCurrency");
    },

    handleSelectCountry(e) {
      this.currency = e;
    },

    formattedAmount(amount){
      return formatAmount(parseFloat(this.amount))
    }
  },
});
</script>

<style scoped>
@import "../../styles/dashboard.css";
</style>
