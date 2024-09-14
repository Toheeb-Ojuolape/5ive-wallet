<template>
  <BottomSheet :isActive="isActive" @closeBtn="closeBtn">
    <h3>Pay-in Method</h3>
    <select v-model="payin" class="custom-select">
      <option value="" disabled selected>Select a pay-in method</option>
      <option
        v-for="(method, i) in offering?.data.payin.methods"
        :key="i"
        :value="i"
      >
        {{ method.kind }}
      </option>
    </select>
    <div v-if="payin !== ''">
      <p class="my-2">Please make payment to the account below</p>
      <div
        v-for="(payin, i) in offering?.data.payin.methods[payin]
          .requiredPaymentDetails.required"
        :key="i"
      >
        <label>{{ formatPayinName(payin) }}</label>
        <v-text-field
          variant="outlined"
          :value="DEFAULTPAYIN[payin]"
          readonly
          singleLine
          style="height: 64px"
        />
      </div>
    </div>

    <h3 class="mt-4">Pay-out Method</h3>
    <select v-model="payout" class="custom-select">
      <option value="" disabled selected>Select a payout method</option>
      <option
        v-for="(method, i) in offering?.data.payout.methods"
        :key="i"
        :value="i"
      >
        {{ method.kind }}
      </option>
    </select>

    <div v-if="payout !== ''">
      <p class="my-3">Kindly enter your payout details</p>
      <div
        v-for="(payout, i) in offering?.data.payout.methods[payout]
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

      <v-btn
        @click="handleContinue"
        size="x-large"
        variant="outlined"
        rounded="pill"
        block
        >Submit</v-btn
      >
    </div>
  </BottomSheet>
</template>

<script>
import BottomSheet from "@/components/BottomSheet/BottomSheet.vue";
import { DEFAULTPAYIN } from "@/constants/constant";
import { formatPayinLabel } from "@/utils/formatter";

export default {
  components: { BottomSheet },

  data() {
    return {
      payout: "",
      payin: "",
      paymentDetails: {},
      DEFAULTPAYIN,
    };
  },

  props: {
    offering: {
      type: Object,
    },
    isActive: {
      type: Boolean,
    },
  },

  methods: {
    formatPayinName(name) {
      return formatPayinLabel(name);
    },

    closeBtn() {
      this.$emit("closeBtn");
    },

    handleContinue() {
      this.$emit("handleContinue", {
        paymentDetails: this.paymentDetails,
        payin: this.payin,
      });
    },
  },
};
</script>
