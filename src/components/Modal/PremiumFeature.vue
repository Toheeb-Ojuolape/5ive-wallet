<template>
  <v-dialog max-width="600px" :model-value="isActive" persistent>
    <v-card
      class="mx-auto rounded-xl modal px-6 py-6"
      width="100%"
      max-width="600px"
    >
      <div class="d-flex justify-end">
        <v-col cols="auto">
          <v-btn
            @click="closeBtn"
            density="compact"
            icon="mdi-close"
            size="large"
            flat
          />
        </v-col>
      </div>
      <v-window v-model="step">
        <v-window-item :value="1">
          <FeatureDetails
            :title="title"
            :features="features"
            @closeBtn="closeBtn"
            @handleNext="moveToStepTwo"
          />
        </v-window-item>

        <v-window-item :value="2">
          <PayQrCode :invoice="invoice" @handleNext="moveToStepThree" />
        </v-window-item>

        <v-window-item :value="3">
          <SuccessScreen
            :title="'Subscription successful!'"
            :btn-title="'Continue'"
            :message="'Yay! you are now a premium user of the 5ive wallet 🥳'"
            @handleContinue="handleContinue"
          />
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<script>
import FeatureDetails from "@/elements/PremiumFeature/FeatureDetails.vue";
import PayQrCode from "@/elements/PremiumFeature/PayQrCode.vue";
import SuccessScreen from "@/elements/SuccessScreen.vue";

export default {
  components: { FeatureDetails, PayQrCode, SuccessScreen },
  props: {
    isActive: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    features: {
      type: Array,
    },
  },
  data() {
    return {
      step: 1,
      invoice: null,
    };
  },

  methods: {
    closeBtn() {
      this.$emit("closeBtn");
    },

    moveToStepTwo(invoice) {
      this.step++;
      this.invoice = invoice;
    },

    moveToStepThree() {
      this.step++;
    },

    handleContinue() {
      location.reload();
    },
  },
};
</script>




<style scoped>
.modal{
    overflow-y: scroll
}
</style>