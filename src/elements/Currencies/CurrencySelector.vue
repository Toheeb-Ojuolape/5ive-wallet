<template>
  <div class="country-select currency">
    <v-menu v-model="showmenu" offset-y :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <div v-bind="props" class="currencies-dropdown" block>
          <div>
            <span
              :class="`fi fi-${
                currency ? currency.country : defaultcurrency.country
              }`"
            ></span>
            <span class="ml-2">{{
              currency ? currency.code : defaultcurrency.code
            }}</span>
          </div>
          <div>
            <v-icon icon="mdi-chevron-down" />
          </div>
        </div>
      </template>

      <!-- Country List Component -->
      <CurrenciesList @selectCountry="selectCountry" />
    </v-menu>
  </div>
</template>

<script>
import { ref } from "vue";
import CurrenciesList from "./CurrenciesList.vue";

export default {
  name: "CurrencySelector",
  components: {
    CurrenciesList,
  },
  props: {
    name: {
      type: String,
      required: true,
    },

    currency: {
      type: Object,
    },
  },
  emits: ["handleInput"],
  setup(props, { emit }) {
    const defaultcurrency = ref({
      code: "NGN",
      name: "Nigerian Naira",
      country: "ng",
    });
    const showmenu = ref(false);

    const selectCountry = (selectedCountry) => {
      defaultcurrency.value = selectedCountry;
      showmenu.value = false;
      emit("handleInput", selectedCountry);
    };

    return {
      defaultcurrency,
      showmenu,
      selectCountry,
    };
  },
};
</script>

<style scoped>
@import "../../styles/countries.css";
</style>
