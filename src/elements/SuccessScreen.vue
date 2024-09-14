<template>
  <div class="text-center d-flex justify-center">
    <div class="success-screen">
      <v-img src="../assets/hifive.gif" width="200px" style="margin: auto" />

      <div>
        <h1>{{ title }}</h1>
        <p class="mb-2">{{ message }}</p>
      </div>

      <div>
        <v-btn
          @click="handleContinue"
          block
          size="x-large"
          rounded="pill"
          flat
          variant="outlined"
        >
          {{ btnTitle }}</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import { BRANDCOLOR } from "@/constants/constant";

export default {
  props: {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    btnTitle: {
      type: String,
    },
  },
  data() {
    return {
      BRANDCOLOR,
    };
  },

  methods: {
    handleContinue() {
      this.$emit("handleContinue");
    },
  },
};
</script>

<style scoped>
.success-screen > * {
  margin: 0px 0px 18px 0px;
}
</style>
