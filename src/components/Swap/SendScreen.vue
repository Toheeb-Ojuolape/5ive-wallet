<template>
  <div class="send-screen">
    <p>Enter the amount you would like to send</p>
    <currency-input
      :label="'You send'"
      :currency="currency"
      @handleInput="handleSenderInput"
      @handleSelectCountry="handleSenderCurrency"
      :type="'number'"
    />
    <currency-input
      :label="'Receiver gets'"
      :currency="defaultcurrency"
      :readonly="true"
      :amount="receiverAmount"
      @handleSelectCountry="handleReceiverCurrency"
      :type="'text'"
    />

    <div class="my-4" v-if="bestOffer">
      <div>
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
          <p>Please make payment to the account below</p>
          <div
            v-for="(payin, i) in bestOffer.data.payin.methods[payin]
              .requiredPaymentDetails.required"
            :key="i"
          >
            <label>{{ payin }}</label>
            <v-text-field
              variant="outlined"
              :value="DEFAULTPAYIN[payin]"
              readonly
              singleLine
            />
          </div>
        </div>
      </div>

      <div>
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
          <p>Kindly enter your payout details</p>
          <div
            v-for="(payout, i) in bestOffer.data.payout.methods[payout]
              .requiredPaymentDetails.required"
            :key="i"
          >
            <v-text-field
              v-if="payout"
              :label="payout"
              v-model="paymentDetails[payout]"
              variant="outlined"
            />
          </div>
        </div>
      </div>

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
      sendercurrency: this.currency.code,
      receivercurrency: this.defaultcurrency.code,
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
        await this.swapStore.submitSwap(this.paymentDetails);
      } catch (error) {
        handleErrors(error);
      }
    },
  },
};
</script>

<style scoped>
.send-screen {
  overflow-y: scroll;
  height: 90vh;
}

.send-screen > * {
  margin: 10px 0px 0px 0px;
}

.custom-select {
  width: 100%; /* Full width */
  padding: 12px; /* Add padding */
  font-size: 16px; /* Font size */
  border: 1px solid #ccc; /* Border style */
  border-radius: 4px; /* Rounded corners */
  /* background-color: white; */
  appearance: none; /* Remove default styling */
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%204%205%27%3E%3Cpath%20fill%3D%27%23333%27%20d%3D%27M2%200L0%202h4zM2%205l2-2H0z%27%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
}

.custom-select:focus {
  border-color: #007bff;
  outline: none;
}

.custom-select option {
  padding: 10px;
}
</style>
