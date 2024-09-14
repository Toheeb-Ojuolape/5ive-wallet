<template>
  <div>
    <v-btn @click="goBack" flat size="small" icon depressed><v-icon>mdi-arrow-left</v-icon></v-btn>
    <h2 class="mt-2">Confirm your Order</h2>

    <OrderCard
      :offering="bestOffer"
      :amount="amount"
      @closeOrder="closeOrder"
      @submitOrder="submitOrder"
      :loading="loading"
    />

    <ReasonForm
      :isActive="isCancel"
      @closeBtn="closeBtn"
      @submitClose="submitClose"
    />
  </div>
</template>

<script>
import OrderCard from "@/elements/OrderCard.vue";
import ReasonForm from "@/elements/Forms/ReasonForm.vue";
import { useSwapStore } from "@/stores/swap.store";
import { mapState, storeToRefs } from "pinia";
export default {
  components: {
    OrderCard,
    ReasonForm,
  },
  computed: {
    ...mapState(useSwapStore, {
      bestOffer: "bestOffer",
      amount: "amount",
      loading:"loading"
    }),
  },

  setup() {
    const swapStore = useSwapStore();
    const { isCancel, swapStep } = storeToRefs(swapStore);

    return { swapStore, isCancel, swapStep };
  },

  methods: {

    closeOrder(){
        this.isCancel = true
    },
    submitClose(reason) {
      this.swapStore.closeOrder(reason);
    },

    submitOrder() {
      this.swapStore.submitOrder();
    },

    closeBtn() {
      this.isCancel = false;
    },

    goBack(){
      this.swapStep--
    }
  },
};
</script>
