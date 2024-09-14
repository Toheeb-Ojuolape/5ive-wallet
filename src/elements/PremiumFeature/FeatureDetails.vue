<template>
  <div class="feature-details">
    <h1>{{ title }} is a premium feature!</h1>
    <div class="my-4">With {{ title }} you get:</div>

    <ul>
      <li
        class="my-3 fade-in"
        :style="`--fade-delay: ${i / 4}s`"
        v-for="(feature, i) in features"
        :key="i"
      >
        <v-btn size="x-small" class="mr-2" flat color="#ecfff6" icon
          ><v-icon color="#32c36c">mdi-check</v-icon></v-btn
        >
        {{ feature }}
      </li>
    </ul>

    <div class="my-5 fade-in" :style="`--fade-delay: 0.8s`">
      Become a Premium 5ive wallet user for only
      <strong>1,000 SATS (BTC) a year </strong> to unlock this feature!
    </div>

    <div class="my-6 fade-in" :style="`--fade-delay: 0.8s`">
      <v-btn
        @click="handleSubscribe"
        color="black"
        flat
        rounded="pill"
        size="x-large"
        block
        class="my-3"
        :loading="loading"
        >Subcribe Now</v-btn
      >

      <v-btn
        @click="closeBtn"
        variant="outlined"
        size="x-large"
        class="rounded-pill my-6"
        block
        >Try it for free!</v-btn
      >
    </div>
  </div>
</template>

<script>
import lnService from "@/services/lnService";
import { handleErrors } from "@/utils/handlers";

export default {
  props: {
    title: {
      type: String,
    },
    features: {
      type: Array,
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  methods: {
    closeBtn() {
      this.$emit("closeBtn");
    },

    async handleSubscribe() {
      try {
        this.loading = true;
        const invoice = await lnService.generateInvoice();
        this.loading = false;

        this.$emit("handleNext", invoice);
      } catch (error) {
        handleErrors(error);
        this.loading = false;
      }
    },
  },
};
</script>



<style scoped>
.feature-details{
  overflow-y: auto;
  max-height: 550px;
  padding: 0px 0px 30px 0px
}
</style>