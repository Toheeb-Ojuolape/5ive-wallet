<template>
  <div class="bg-black text-center px-9 py-6">
    <div class="d-flex justify-space-between mb-3">
      <v-avatar class="mt-2">
        <v-icon
          v-if="!user?.image"
          size="50"
          color="white"
          icon="mdi-account-circle"
        ></v-icon>
        <v-img v-if="user?.image" :src="user?.image"></v-img>
      </v-avatar>
      <v-btn
        density="compact"
        size="50"
        class="glass-button"
        to="/notification"
        icon
      >
        <v-badge color="error" dot :content="getUnreadNotification"
          ><v-icon size="small">mdi-bell-outline</v-icon></v-badge
        >
      </v-btn>
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
        {{ currency.code }} {{ formattedAmount(balanceAmount(currency.code)) }}
      </h1>
    </div>

    <div class="dashboard-actions">
      <v-btn rounded="pill" size="large" to="/send"> Send</v-btn>
      <v-btn
        @click="selectCurrency"
        rounded="pill"
        size="large"
        variant="outlined"
      >
        Swap ⚡️</v-btn
      >
    </div>
  </div>
</template>

<script lang="ts">
import { DEFAULTCURRENCY } from "@/constants/constant";
import CurrencySelector from "@/elements/Currencies/CurrencySelector.vue";
import { Currency } from "@/interfaces/currency";
import { useTransactionStore } from "@/stores/transactions.store";
import { useUserStore } from "@/stores/user.store";
import { formatAmount, getBalances } from "@/utils/formatter";
import { mapState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  components: { CurrencySelector },
  data() {
    return {
      currency: DEFAULTCURRENCY as Currency,
    };
  },

  computed: {
    ...mapState(useUserStore, {
      user: "user",
      getUnreadNotification: "getUnreadNotification",
    }),

    ...mapState(useTransactionStore, {
      balance: "balance",
    }),
  },
  methods: {
    selectCurrency() {
      this.$emit("selectCurrency");
    },

    handleSelectCountry(e) {
      this.currency = e;
    },

    formattedAmount(amount) {
      return formatAmount(amount);
    },

    balanceAmount(currencyCode) {
      return getBalances(this.balance, currencyCode);
    },
  },
});
</script>

<style scoped>
@import "../../styles/dashboard.css";
</style>
