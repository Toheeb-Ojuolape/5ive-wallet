<template>
  <div>
    <h2>Complete your order</h2>

    <OrderCard
      :offering="bestOffer"
      :amount="amount"
      @closeOrder="closeOrder"
      @submitOrder="submitOrder"
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
    }),
  },

  setup() {
    const swapStore = useSwapStore();
    const { isCancel } = storeToRefs(swapStore);

    return { swapStore, isCancel };
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
  },
};
</script>
