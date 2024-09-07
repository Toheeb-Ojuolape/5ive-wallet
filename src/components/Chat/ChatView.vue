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
        v-if="message.role == 'Seller'"
        class="d-flex align-start flex-column mb-3"
      >
        <SenderCard :messages="message" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import ReceiverCard from './ReceiverCard.vue'
  import SenderCard from './SenderCard.vue'

  export default defineComponent({
    components: { ReceiverCard, SenderCard },
    props: {
      messages: {
        type: Array,
        default: () => [],
      },
      isTyping: {
        type: Object,
        default: () => ({}),
      },
      role: {
        type: String,
        default: '',
      },
    },
    setup (props) {
      const containerRef = ref<HTMLDivElement | null>(null)

      const scrollToBottom = () => {
        const chatViewRef = document
          .getElementById('chatview-container')
        chatViewRef
          ?.scrollTo(
            0,
            (chatViewRef?.scrollHeight) || 0
          )
      }

      watch(props.messages, () => {
        setTimeout(() => scrollToBottom(), 100)
      })

      return {
        containerRef,
        scrollToBottom,
      }
    },
  })
</script>

<style scoped>
.chatview-container {
  height: 70vh;
  overflow-y: auto;
  padding: 10px;
}

.timestamp {
  font-size: 9px;
}

.buyerImageContainer {
  background: #207cfe;
  color: white;
  padding: 9px;
  border-radius: 10px;
  margin: 10px 0px 0px 0px;
}

.sellerImageContainer {
  background: #dedfe3;
  color: black;
  padding: 9px;
  border-radius: 10px;
  max-width: 180px;
  margin: 10px 0px 0px 0px;
}
</style>
