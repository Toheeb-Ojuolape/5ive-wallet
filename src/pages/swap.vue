<template>
  <div class="swap-screen">
    <v-window v-model="step">
      <v-window-item :value="1">
        <SendScreen
          :currency="currency"
          :defaultcurrency="defaultcurrency"
          :receiverAmount="receiverAmount"
        />
      </v-window-item>

      <v-window :value="2">
        <CompleteOrder />
      </v-window>

      <v-window :value="3">
        <success-screen />
      </v-window>
    </v-window>

    <Overlayloader :loading="loading" :text="loadingMessage" />
    <vc-form
      :isActive="isVcActive"
      :isVcLoading="isVcLoading"
      :vcstep="vcstep"
      @handleCreateVc="handleCreateVc"
      @handleContinue="handleContinue"
    />
  </div>
</template>

<script>
import SendScreen from "@/components/Swap/SendScreen.vue";
import SubmitOrder from "@/components/Swap/SubmitOrder.vue";
import Overlayloader from "@/elements/overlayloader.vue";
import VcForm from "@/elements/Forms/VcForm.vue";
import { useSwapStore } from "@/stores/swap.store";
import { storeToRefs } from "pinia";

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
      isVcLoading,
      isVcActive,
    } = storeToRefs(swapStore);

    const handleCreateVc = ({ name, country }) => {
      const offeringStore = useOfferingsStore();

      offeringStore.requestVc({
        name: name,
        country: country,
      });
    };

    const handleContinue = () =>{
      //handle continue
    }

   

    return {
      loading,
      swapStore,
      currency,
      defaultcurrency,
      loadingMessage,
      receiverAmount,
      vcstep,
      isVcLoading,
      isVcActive,
      handleCreateVc,
      handleContinue
    };
  },

  components: { SendScreen, SubmitOrder, Overlayloader, VcForm },
  data() {
    return {
      step: 1,
    };
  },
};
</script>

<style scoped>
.swap-screen {
  margin: auto 15px;
}
</style>
