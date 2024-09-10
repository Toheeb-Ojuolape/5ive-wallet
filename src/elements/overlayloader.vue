<template>
    <v-overlay :model-value="loading" class="d-flex align-center justify-center">
      <div class="d-flex flex-column align-center justify-center">
        <v-progress-circular size="large" indeterminate></v-progress-circular>
        <p class="mt-4" style="color: white">{{ text }}</p>
      </div>
    </v-overlay>
  </template>
  
  <script>
  export default {
    props: {
      loading: {
        type: Boolean,
        required: true
      },
      text:{
        type: String
      },
    },
  };
  </script>
  