<template>
    <div class="countries-list">
      <v-list class="px-3 overflow-y-scroll">
        <v-text-field
          v-model="searchTerm"
          placeholder="Search for a country..."
          variant="outlined"
          density="comfortable"
        />
        <v-list-item
          v-for="(country, i) in filteredCountries"
          :key="i"
          @click="selectCountry(country)"
          class="pointer"
        >
          <v-list-item-content>
            <span :class="`fi fi-${country.code.toLowerCase()}`"></span>
            <span class="ml-2">{{ country.name }}</span>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </template>
  
  <script>
  import COUNTRIES from '../../data/countries.json';
  
  export default {
    name: 'CountriesList',
    data() {
      return {
        searchTerm: '',
        countries: COUNTRIES,
      };
    },
    computed: {
      filteredCountries() {
        const term = this.searchTerm.toLowerCase();
        return this.countries.filter((country) =>
          country.name.toLowerCase().includes(term)
        );
      },
    },
    methods: {
      selectCountry(country) {
        this.$emit('selectCountry', country);
      },
    },
  };
  </script>
  
  <style scoped>
  .pointer {
    cursor: pointer;
  }
  </style>
  