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
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent, ref } from 'vue'
    import { useMessageStore } from '@/stores/message.store'
    import { storeToRefs } from 'pinia'
    import ChatView from '../components/Chat/ChatView.vue'
  
    export default defineComponent({
      components: { ChatView },
      setup () {
        const messageStore = useMessageStore()
        const { messages } = storeToRefs(messageStore)
        const chatViewRef = ref<InstanceType<typeof ChatView> | null>(null)
  
        const addMessage = (message: string) => {
          messageStore.addMessage('Buyer', message, '2:00 PM')
        }
  
        return {
          messages,
          addMessage,
          chatViewRef,
        }
      },
    })
  </script>
  
  <style scoped>
  .chat-input {
    position: absolute;
    width: 90%;
    bottom: 0;
    margin: 0px 0px 50px 0px;
  }
  </style>
  