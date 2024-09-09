<template>
    <div class="country-select currency">
      <v-menu v-model="showmenu" offset-y :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <div
            v-bind="props"
            class="currencies-dropdown"
            block
          >
            <div>
              <span :class="`fi fi-${country.country}`"></span>
              <span class="ml-2">{{ country.code }}</span>
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
    },
    emits: ["handleInput"],
    setup(props, { emit }) {
      const country = ref({
        code: "NGN",
        name: "Nigerian Naira",
        country: "ng"
      });
      const showmenu = ref(false);
  
      const selectCountry = (selectedCountry) => {
        country.value = selectedCountry;
        showmenu.value = false; // Close the menu after selecting a country
        emit("handleInput", { [props.name]: selectedCountry.code });
      };
  
      return {
        country,
        showmenu,
        selectCountry,
      };
    },
  };
  </script>
  
  <style scoped>
  @import "../../styles/countries.css";
  </style>
  