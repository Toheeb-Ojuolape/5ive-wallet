<template>
  <div class="send-screen">
    <p>Enter the amount you would like to send</p>
    <currency-input
      :label="'You send'"
      :currency="defaultcurrency"
      @handleInput="handleSenderInput"
      @handleSelectCountry="handleSenderCurrency"
      :type="'number'"
    />
    <currency-input
      :label="'Receiver gets'"
      :currency="currency"
      :readonly="true"
      :amount="receiverAmount"
      @handleSelectCountry="handleReceiverCurrency"
      :type="'text'"
    />

    <div class="my-4" v-if="bestOffer">
      <v-card flat rounded="lg" class="pa-5">
        <h3>Pay-in Method</h3>
        <select v-model="payin" class="custom-select">
          <option value="" disabled selected>Select a pay-in method</option>
          <option
            v-for="(method, i) in bestOffer.data.payin.methods"
            :key="i"
            :value="i"
          >
            {{ method.kind }}
          </option>
        </select>

        <div class="my-3" v-if="payin !== ''">
          <p class="my-3">Please make payment to the account below</p>
          <div
            v-for="(payin, i) in bestOffer.data.payin.methods[payin]
              .requiredPaymentDetails.required"
            :key="i"
          >
            <label>{{ formatPayinName(payin) }}</label>
            <v-text-field
              variant="outlined"
              :value="DEFAULTPAYIN[payin]"
              readonly
              singleLine
            />
          </div>
        </div>
      </v-card>

      <v-card flat rounded="lg" class="pa-5 my-5">
        <h3>Pay-out Method</h3>
        <select v-model="payout" class="custom-select">
          <option value="" disabled selected>Select a payout method</option>
          <option
            v-for="(method, i) in bestOffer.data.payout.methods"
            :key="i"
            :value="i"
          >
            {{ method.kind }}
          </option>
        </select>

        <div v-if="payout !== ''">
          <p class="my-3">Kindly enter your payout details</p>
          <div
            v-for="(payout, i) in bestOffer.data.payout.methods[payout]
              .requiredPaymentDetails.required"
            :key="i"
          >
            <v-text-field
              v-if="payout"
              :label="formatPayinName(payout)"
              v-model="paymentDetails[payout]"
              variant="outlined"
              type="number"
              inputmode="number"
            />
          </div>
        </div>
      </v-card>

      <v-btn
        block
        variant="outlined"
        size="x-large"
        rounded="pill"
        @click="submitSwap"
        :loading="isSubmitLoading"
      >
        Submit</v-btn
      >
    </div>
  </div>
</template>

<script>
import CurrencyInput from "@/elements/Forms/CurrencyInput.vue";
import { useSwapStore } from "@/stores/swap.store";
import { handleErrors } from "@/utils/handlers";
import { storeToRefs } from "pinia";
import { DEFAULTPAYIN } from "@/constants/constant";
import { formatPayinLabel } from "@/utils/formatter";

export default {
  components: { CurrencyInput },
  props: {
    currency: {
      type: Object,
    },
    defaultcurrency: {
      type: Object,
    },
    receiverAmount: {
      type: String,
    },
  },

  data() {
    return {
      sendercurrency: this.defaultcurrency.code,
      receivercurrency: this.currency.code,
      payout: "",
      payin: "",
      DEFAULTPAYIN,
      paymentDetails: {},
    };
  },

  setup() {
    const swapStore = useSwapStore();
    const { bestOffer, isSubmitLoading } = storeToRefs(swapStore);

    return { swapStore, bestOffer, isSubmitLoading };
  },

  methods: {
    formatPayinName(name) {
      return formatPayinLabel(name);
    },

    handleSenderInput(e) {
      this.fetchBestOfferings({
        amount: e,
        from: this.sendercurrency,
        to: this.receivercurrency,
      });
    },

    handleSenderCurrency(e) {
      this.sendercurrency = e.code;
      this.swapStore.resetOffer();
    },

    handleReceiverCurrency(e) {
      this.receivercurrency = e.code;
      this.swapStore.resetOffer();
    },

    async fetchBestOfferings(senderInput) {
      try {
        await this.swapStore.fetchBestOffering(senderInput);
      } catch (error) {
        handleErrors(error);
      }
    },

    async submitSwap() {
      try {
        await this.swapStore.submitSwap(this.paymentDetails, this.payin);
      } catch (error) {
        handleErrors(error);
      }
    },
  },
};
</script>

<style scoped>
.send-screen {
  padding: 0px 0px 65px 0px;
  margin: 0px 3px;
}

.send-screen > * {
  margin: 10px 0px 0px 0px;
}
</style>
