<template>
  <div class="ma-6">
    <h2>Hello 👋🏽</h2>
    <p>Let's help you send money to any country in the world</p>
    <div>
      <ChatView ref="chatViewRef" :messages="messages" />
    </div>
    <div class="chat-input">
      <ChatInput @addmessage="addMessage" />
    </div>

    <VcForm
      :isActive="isVcActive"
      @closeBtn="closeVc"
      :isVcLoading="isVcLoading"
      :vcstep="vcstep"
      @handleCreateVc="handleCreateVc"
      @handleContinue="handleContinue"
    />

    <PayoutForm
      :isActive="isPayout"
      :offering="offering"
      @handleContinue="handleRequestQuote"
      @closeBtn="closePayout"
    />

    <RateForm
      :isActive="isRating"
      :offering="offering"
      @handleContinue="closeRating"
      @closeBtn="isRating = false"
    />

    <OverlayLoader :loading="loading" :text="loadingMessage" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useMessageStore } from "@/stores/message.store";
import { storeToRefs } from "pinia";
import ChatView from "../components/Chat/ChatView.vue";
import ChatInput from "@/components/Chat/ChatInput.vue";
import OverlayLoader from "@/elements/Loader/OverlayLoader.vue";
import { useOfferingsStore } from "@/stores/offerings.store";
import VcForm from "@/elements/Forms/VcForm.vue";
import { handleErrors } from "@/utils/handlers";
import RateForm from "@/elements/Forms/RateForm.vue";
import PayoutForm from "@/elements/Forms/PayoutForm.vue";

export default defineComponent({
  components: {
    ChatView,
    ChatInput,
    OverlayLoader,
    VcForm,
    RateForm,
    PayoutForm,
  },

  setup() {
    const messageStore = useMessageStore();
    const offeringStore = useOfferingsStore();
    const { messages } = storeToRefs(messageStore);
    const {
      loading,
      isRating,
      loadingMessage,
      offering,
      vcstep,
      isVcActive,
      isVcLoading,
      isPayout,
    } = storeToRefs(offeringStore);

    const addMessage = (message) => {
      if (messageStore.stage === "ENTER AMOUNT") {
        if (isNaN(parseFloat(message))) {
          return handleErrors({ message: "Please enter a valid amount" });
        }
        //request for payin and show payout here
        offeringStore.setAmount(message);
      }

      if (messageStore.stage === "CLOSE") {
        if (!message) {
          return handleErrors({ message: "Please enter a valid reason" });
        }
        offeringStore.closeOrder(message);
      }
      messageStore.addMessage("Buyer", message, "text");
    };

    const handleCreateVc = ({ name, country }) => {
      const offeringStore = useOfferingsStore();

      offeringStore.requestVc({
        name: name,
        country: country,
      });
    };

    const handleContinue = () => {
      const messageStore = useMessageStore();
      messageStore.addMessage(
        "SELLER",
        "Great, we have received your Verifiable Credential, now kindly enter the amount you would like to send",
        "text"
      );
      offeringStore.toggleVc();
    };

    const handleRequestQuote = ({ paymentDetails, payin }) => {
      offeringStore.requestQuote(paymentDetails, payin);
    };

    const closeRating = () => {
      offeringStore.closeRating();
      window.location.href = '/history'
    };

    return {
      messages,
      addMessage,
      loading,
      loadingMessage,
      isRating,
      handleCreateVc,
      handleContinue,
      offering,
      closeRating,
      vcstep,
      isVcLoading,
      isVcActive,
      handleRequestQuote,
      isPayout,
    };
  },

  methods: {
    closeVc() {
      this.isVcActive = false;
    },

    closePayout() {
      this.isPayout = false;
    },
  },
});
</script>

<style scoped>
.chat-input {
  position: absolute;
  width: 90%;
  bottom: 0;
  margin: 0px 0px 50px 0px;
}
</style>
