<template>
  <div class="swap-screen">
    <v-stepper
      complete-icon=""
      bg-color="transparent"
      flat
      :model-value="swapStep"
      :items="headers"
      hide-actions
    >
      <template v-if="swapStep === 1">
        <SendScreen
          :currency="currency"
          :defaultcurrency="defaultcurrency"
          :receiverAmount="receiverAmount"
        />
      </template>
      <template v-if="swapStep === 2">
        <SubmitOrder v-if="bestOffer" />
      </template>

      <template v-if="swapStep === 3">
        <v-card flat class="rounded-xl pa-7">
          <SuccessScreen
            :title="'Order submitted Successfully'"
            :message="'You have successfully submitted your order. You can track it on the transactions page'"
            @handleContinue="isRating = true"
            :btnTitle="'Rate PFI'"
          />
        </v-card>
        <RateForm
          :isActive="isRating"
          @handleContinue="handleRating"
          @closeBtn="isRating = false"
          :offering="bestOffer"
        />
      </template>
    </v-stepper>

    <Overlayloader :loading="loading" :text="loadingMessage" />
    <VcForm
      :isActive="isVcActive"
      :isVcLoading="isVcLoading"
      :vcstep="vcstep"
      @handleCreateVc="handleCreateVc"
      @handleContinue="handleContinue"
      @closeBtn="closeVc"
    />

    <PremiumFeature
      :isActive="isPremium && !isSubscribed"
      @closeBtn="isPremium = false"
      :title="'Instant Swap'"
      :features="INSTANTSWAPFEATURES"
    />
  </div>
</template>

<script>
import SendScreen from "@/components/Swap/SendScreen.vue";
import SubmitOrder from "@/components/Swap/SubmitOrder.vue";
import Overlayloader from "../elements/Loader/OverlayLoader.vue";
import VcForm from "@/elements/Forms/VcForm.vue";
import { useSwapStore } from "@/stores/swap.store";
import { mapState, storeToRefs } from "pinia";
import SuccessScreen from "@/elements/SuccessScreen.vue";
import RateForm from "@/elements/Forms/RateForm.vue";
import PremiumFeature from "@/components/Modal/PremiumFeature.vue";
import { INSTANTSWAPFEATURES } from "@/constants/constant";
import { useUserStore } from "@/stores/user.store";

export default {
  components: {
    SendScreen,
    SubmitOrder,
    Overlayloader,
    VcForm,
    SuccessScreen,
    RateForm,
    PremiumFeature,
  },
  setup() {
    const swapStore = useSwapStore();
    const {
      currency,
      defaultcurrency,
      loading,
      loadingMessage,
      receiverAmount,
      vcstep,
      isVcActive,
      isVcLoading,
      swapStep,
      bestOffer,
    } = storeToRefs(swapStore);

    const handleCreateVc = ({ name, country }) => {
      swapStore.requestVc({
        name: name,
        country: country,
      });
    };

    return {
      loading,
      swapStore,
      currency,
      defaultcurrency,
      loadingMessage,
      receiverAmount,
      vcstep,
      handleCreateVc,
      isVcActive,
      isVcLoading,
      swapStep,
      bestOffer,
    };
  },

  computed: {
    ...mapState(useUserStore, {
      isSubscribed: "isSubscribed",
    }),
  },

  data: () => ({
    headers: ["Payment Details", "Confirmation", "Success"],
    isRating: false,
    isPremium: true,
    INSTANTSWAPFEATURES,
  }),

  methods: {
    closeVc() {
      this.isVcActive = false;
    },
    handleContinue() {
      this.isVcActive = false;
      this.loading = false;
    },

    handleRating() {
      window.location.href = "/history";
    },
  },
};
</script>

<style scoped>
.swap-screen {
  margin: auto 0px;
  overflow-y: auto;
  height: 90vh;
  padding: 0px 15px;
}
</style>
