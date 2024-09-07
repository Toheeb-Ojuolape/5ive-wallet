// src/stores/messageStore.ts
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: [
      {
        role: 'Buyer',
        message: 'When can I expect the delivery?',
        time: '11:30 AM',
      },
      {
        role: 'Seller',
        message: 'It will be delivered by tomorrow',
        time: '12:00 PM',
      },
      { role: 'Buyer', message: 'Thank you!', time: '12:30 PM' },
    ],
  }),

  getters: {
    getMessages: state => state.messages,
  },

  actions: {
    addMessage (role, message, time) {
      this.messages.push({ role, message, time })
    },
  },
})
