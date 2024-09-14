<template>
  <BottomSheet :isActive="isActive" @closeBtn="closeBtn">
    <p class="text-h6 font-weight-bold my-2">Send money to:</p>
    <div v-for="(currency, i) in CURRENCIES" :key="i">
      <div @click="setCurrency(currency)" class="currency-btn">
        <span :class="`fi fi-${currency.country} mr-2 rounded-icon`"></span>
        <div>
          <div class="currency-name">{{ currency.name }}</div>
          <span class="currency-code"> {{ currency.code }}</span>
        </div>
      </div>
    </div>
  </BottomSheet>
</template>

<script>
import BottomSheet from "@/components/BottomSheet/BottomSheet.vue";
import { CURRENCIES } from "@/constants/constant";
export default {
  props: {
    props: {
      isActive: {
        type: Boolean,
      },
    },
  },
  data() {
    return {
      CURRENCIES,
    };
  },
  methods: {
    closeBtn() {
      this.$emit("closeBtn");
    },
    setCurrency(currency) {
      this.$emit("setCurrency", currency);
    },
  },
  components: { BottomSheet },
};
</script>

<style scoped>
.currency-btn {
  width: 100%;
  display: flex;
  padding: 20px 10px;
  border-radius: 12px;
  border: 1px solid #dde2e9;
  margin: 0px 0px 10px 0px;
  cursor: pointer;
}

.rounded-icon {
  display: inline-block;
  width: 30px; /* Adjust as needed */
  height: 30px; /* Adjust as needed */
  border-radius: 50%;
  background-color: #ccc; /* Replace with the desired background color */
}

.currency-name {
  font-size: 16px;
  margin: 0px 0px -10px 0px;
  padding: 0px;
}

.currency-code {
  font-size: 9px;
  margin: 0px;
  padding: 0px;
}
</style>
