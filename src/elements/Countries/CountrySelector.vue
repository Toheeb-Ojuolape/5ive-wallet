<template>
  <div class="country-select">
    <v-menu v-model="showmenu" offset-y :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <label>Select Country</label>
        <div v-bind="props" class="countries-dropdown" block>
          <div>
            <span :class="`fi fi-${country.code.toLowerCase()}`"></span>
            <span class="ml-2">{{ country.name }}</span>
          </div>
          <div>
            <v-icon icon="mdi-chevron-down" />
          </div>
        </div>
      </template>

      <!-- Country List Component -->
      <CountriesList @selectCountry="selectCountry" />
    </v-menu>
  </div>
</template>

<script>
import { ref } from "vue";
import CountriesList from "./CountriesList.vue";

export default {
  name: "CountrySelector",
  components: {
    CountriesList,
  },
  props: {
    name: {
      type: String,
    },
    countryvalue:{
      type: Object
    }
  },
  emits: ["handleInput"],
  setup(props, { emit }) {
    const country = ref(
      props.countryvalue || {
        code: "NG",
        name: "Nigeria",
      }
    );
    const showmenu = ref(false);

    const selectCountry = (selectedCountry) => {
      country.value = selectedCountry;
      showmenu.value = false;
      emit("handleInput", selectedCountry);
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
