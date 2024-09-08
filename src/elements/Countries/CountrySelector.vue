<template>
  <div class="country-select">
    <v-menu v-model="showmenu" offset-y :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <label>Select Country</label>
        <div
          v-bind="props"
          class="countries-dropdown"
          color="red"
          block
        >
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
      required: true,
    },
  },
  emits: ["handleInput"],
  setup(props, { emit }) {
    const country = ref({
      code: "NG",
      name: "Nigeria",
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
