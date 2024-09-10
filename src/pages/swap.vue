<template>
  <div class="swap-screen">
    <v-window :model-value="swapStep">
      <v-window-item :value="1">
        <SendScreen
          :currency="currency"
          :defaultcurrency="defaultcurrency"
          :receiverAmount="receiverAmount"
        />
      </v-window-item>

      <v-window-item :value="2">
        <SubmitOrder v-if="bestOffer" />
      </v-window-item>

      <v-window-item :value="3">
        <SuccessScreen
          :title="'Order submitted Successfully'"
          :message="'You have successfully submitted your order. You can track it on the transactions page'"
          @handleContinue="isRating = true"
          :btnTitle="'Rate PFI'"
        />
        <RateForm
          :isActive="isRating"
          @handleContinue="handleContinue"
          @closeBtn="isRating = false"
          :offering="bestOffer"
        />
      </v-window-item>
    </v-window>

    <Overlayloader :loading="loading" :text="loadingMessage" />
    <VcForm
      :isActive="isVcActive"
      :isVcLoading="isVcLoading"
      :vcstep="vcstep"
      @handleCreateVc="handleCreateVc"
      @handleContinue="handleContinue"
      @closeBtn="closeVc"
    />
  </div>
</template>

<script lang="ts">
import SendScreen from "@/components/Swap/SendScreen.vue";
import SubmitOrder from "@/components/Swap/SubmitOrder.vue";
import Overlayloader from "@/elements/overlayloader.vue";
import VcForm from "@/elements/Forms/VcForm.vue";
import { useSwapStore } from "@/stores/swap.store";
import { storeToRefs } from "pinia";
import SuccessScreen from "@/elements/SuccessScreen.vue";
import router from "@/router";
import RateForm from "@/elements/Forms/RateForm.vue";

export default {
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

    const handleContinue = () => {
      swapStore.toggleVc();
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
      handleContinue,
      isVcActive,
      isVcLoading,
      swapStep,
      bestOffer,
    };
  },

  components: {
    SendScreen,
    SubmitOrder,
    Overlayloader,
    VcForm,
    SuccessScreen,
    RateForm,
  },
  data() {
    return {
      step: 1,
      isRating: false,
    };
  },

  methods: {
    closeVc() {
      this.isVcActive = false;
    },
    handleContinue() {
      router.push("/history");
    },
  },
};
</script>

<style scoped>
.swap-screen {
  margin: auto 15px;
}
</style>
