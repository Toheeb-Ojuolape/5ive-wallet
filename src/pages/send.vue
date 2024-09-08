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

    <vc-form :isActive="isActive" @closeBtn="closeBtn" />

    <overlayloader :loading="loading" :text="'Fetching available offers'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, handleError, ref } from "vue";
import { useMessageStore } from "@/stores/message.store";
import { storeToRefs } from "pinia";
import ChatView from "../components/Chat/ChatView.vue";
import overlayloader from "@/elements/overlayloader.vue";
import { useOfferingsStore } from "@/stores/offerings.store";
import VcForm from "@/components/BottomSheet/VcForm.vue";
import { handleErrors } from "@/utils/handlers";

export default defineComponent({
  components: { ChatView, overlayloader, VcForm },
  setup() {
    const messageStore = useMessageStore();
    const offeringStore = useOfferingsStore();
    const { messages, stage } = storeToRefs(messageStore);
    const { loading, isVcActive: isActive } = storeToRefs(offeringStore)

    const addMessage = (message: string) => {
      if(messageStore.stage === 'ENTER AMOUNT'){
        if(isNaN(parseFloat(message))){
          return handleErrors("Please enter a valid amount")
        }
        offeringStore.requestQuote(message)
      }
      messageStore.addMessage("Buyer", message, 'text');
    };

    const closeBtn = () =>{
      offeringStore.toggleVc()
    }

    return {
      messages,
      addMessage,
      loading,
      isActive,
      closeBtn
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
