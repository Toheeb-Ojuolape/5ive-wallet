<template>
  <div class="bg-black text-center px-9 py-6">
    <div class="d-flex justify-space-between mb-3">
      <v-avatar>
        <v-icon
          v-if="!user?.image"
          icon="mdi-account-circle"
        ></v-icon>
        <v-img v-if="user?.image" :src="user?.image"></v-img>
      </v-avatar>
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
      <h1 class="dashboard-amount">
        {{ currency.code }} {{ formattedAmount() }}
      </h1>
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
import { useUserStore } from "@/stores/user.store";
import { formatAmount } from "@/utils/formatter";
import { mapState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  components: { CurrencySelector },
  data() {
    return {
      amount: "1000",
      currency: DEFAULTCURRENCY as Currency,
    };
  },

  computed: {
    ...mapState(useUserStore, {
      user: "user",
    }),
  },
  methods: {
    selectCurrency() {
      this.$emit("selectCurrency");
    },

    handleSelectCountry(e) {
      this.currency = e;
    },

    formattedAmount() {
      return formatAmount(parseFloat(this.amount));
    },
  },
});
</script>

<style scoped>
@import "../../styles/dashboard.css";
</style>
