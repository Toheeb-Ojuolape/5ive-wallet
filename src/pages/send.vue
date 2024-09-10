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

    <RateForm
      :isActive="isRating"
      :offering="offering"
      @closeBtn="closeRating"
    />

    <overlayloader :loading="loading" :text="loadingMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, handleError, ref } from "vue";
import { useMessageStore } from "@/stores/message.store";
import { storeToRefs } from "pinia";
import ChatView from "../components/Chat/ChatView.vue";
import overlayloader from "@/elements/overlayloader.vue";
import { useOfferingsStore } from "@/stores/offerings.store";
import VcForm from "@/elements/Forms/VcForm.vue";
import { handleErrors } from "@/utils/handlers";
import RateForm from "@/elements/Forms/RateForm.vue";

export default defineComponent({
  components: { ChatView, overlayloader, VcForm, RateForm },

  setup() {
    const messageStore = useMessageStore();
    const offeringStore = useOfferingsStore();
    const { messages } = storeToRefs(messageStore);
    const {
      loading,
      isVcActive,
      isRating,
      loadingMessage,
      offering,
      isVcLoading,
      vcstep,
    } = storeToRefs(offeringStore);

    const addMessage = (message: string) => {
      if (messageStore.stage === "ENTER AMOUNT") {
        if (isNaN(parseFloat(message))) {
          return handleErrors({ message: "Please enter a valid amount" });
        }
        offeringStore.requestQuote(message);
      }

      if (messageStore.stage === "CLOSE") {
        if (!message) {
          return handleErrors({ message: "Please enter a valid reason" });
        }
        offeringStore.closeOrder(message);
      }
      messageStore.addMessage("Buyer", message, "text");
    };

    const closeVc = () => {
      offeringStore.toggleVc();
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

    const closeRating = () => {
      offeringStore.closeRating();
    };

    return {
      messages,
      addMessage,
      loading,
      loadingMessage,
      isVcActive,
      isRating,
      closeVc,
      handleCreateVc,
      handleContinue,
      offering,
      closeRating,
      isVcLoading,
      vcstep,
    };
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
