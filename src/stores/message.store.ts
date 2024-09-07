import { currentTime } from '@/utils/formatter'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    messages: [
      {
        role: 'Seller',
        message: 'To get started, please select your pay-in and pay-out currency pair',
        time: currentTime(),
        type: 'text'
      },

      {
        role:'',
        message:'',
        time: currentTime(),
        type: 'currency-pairing'
      },
    ],
  }),

  getters: {
    getMessages: state => state.messages,
  },

  actions: {
    addMessage (role, message, time, type) {
      this.messages.push({ role, message, time, type })
    },
  },
})
