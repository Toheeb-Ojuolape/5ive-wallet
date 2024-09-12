<template>
  <div style="position: relative">
    <p class="currency-input-label">{{ label }}</p>
    <input
      @input="handleInput"
      class="currency-input"
      :type="type"
      inputmode="numeric"
      :readonly="readonly"
      :value="amount"
    />
    <CurrencySelector
      :name="'country'"
      :currency="country ? country : currency"
      @handleInput="handleSelectCountry"
      :classname="'currency currency-black'"
    />
  </div>
</template>

<script>
import CurrencySelector from "../Currencies/CurrencySelector.vue";

export default {
  components: { CurrencySelector },
  props: {
    label: {
      type: String,
    },
    currency: {
      type: Object,
    },
    readonly: {
      type: Boolean,
    },
    amount: {
      type: String,
    },
    type: {
      type: String,
    },
  },

  data() {
    return {
      country: null,
    };
  },

  methods: {
    handleInput(e) {
      this.$emit("handleInput", e.target.value);
    },

    handleSelectCountry(country) {
      this.country = country;
      this.$emit("handleSelectCountry", country);
    },
  },
};
</script>

<style scoped>
.currency-input {
  padding: 15px 16px 0px 16px;
  width: 100%;
  border: 0px;
  border-radius: 8px;
  height: 80px;
  font-size: 20px;
  color: black;
  background: white
}

.currency-input:focus {
  outline: 0;
  border: 0;
}

.currency-input-label {
  position: absolute;
  top: 0;
  margin: 10px 0px 0px 13px;
  font-weight: bold;
  font-size: 15px;
  color: black
}

.currency-black{
  color: black
}
</style>
