<template>
  <div id="chatview-container" ref="containerRef" class="chatview-container">
    <div v-for="(message, i) in messages" :key="i">
      <!-- Customer component -->
      <div
        v-if="message.role == 'Buyer'"
        class="d-flex align-end flex-column mt-2"
      >
        <ReceiverCard :messages="message" />
      </div>

      <!-- Sender/Wallet component -->
      <div
        v-if="message.role == 'SELLER'"
        class="d-flex align-start flex-column mb-3"
      >
        <SenderCard :messages="message" />
      </div>

      <div v-if="message.type == 'currency-pairing' && !offerings?.length">
        <CurrencyPairings />
      </div>

      <div v-if="message.type == 'offers' && offerings?.length">
        <Offerings :offerings="offerings" />
      </div>

      <div v-if="message.type == 'order' && offerings?.length">
        <OrderCard
          :offering="offering"
          :amount="amount"
          @closeOrder="closeOrder"
          @submitOrder="submitOrder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import CurrencyPairings from "./CurrencyPairings.vue";
import ReceiverCard from "./ReceiverCard.vue";
import SenderCard from "./SenderCard.vue";
import { useOfferingsStore } from "@/stores/offerings.store";
import { mapState, storeToRefs } from "pinia";
import Offerings from "./OfferingsCard.vue";
import OrderCard from "@/elements/OrderCard.vue";
import { useMessageStore } from "@/stores/message.store";

export default defineComponent({
  components: {
    ReceiverCard,
    SenderCard,
    CurrencyPairings,
    Offerings,
    OrderCard,
  },
  props: {
    messages: {
      type: Array,
      default: () => [],
    },
    role: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const containerRef = ref<HTMLDivElement | null>(null);
    const offeringsStore = useOfferingsStore();
    const { offerings } = storeToRefs(offeringsStore);

    const scrollToBottom = () => {
      const chatViewRef = document.getElementById("chatview-container");
      chatViewRef?.scrollTo(0, chatViewRef?.scrollHeight || 0);
    };

    watch(props.messages, () => {
      setTimeout(() => scrollToBottom(), 100);
    });

    return {
      containerRef,
      scrollToBottom,
      offerings,
    };
  },

  computed: {
    ...mapState(useOfferingsStore, {
      offering: "offering",
      amount: "amount",
    }),
  },

  methods: {
    closeOrder() {
      const messageStore = useMessageStore();
      messageStore.addMessage(
        "SELLER",
        "Please enter your reason for cancelling",
        "text"
      );
      messageStore.setStage("CLOSE");
    },

    submitOrder() {
      const offeringsStore = useOfferingsStore();
      offeringsStore.submitOrder();
    },
  },
});
</script>

<style scoped>
.chatview-container {
  height: 70vh;
  overflow-y: auto;
  overflow-x: auto;
  padding: 10px 10px 0px 0px;
}

.timestamp {
  font-size: 9px;
}
</style>
