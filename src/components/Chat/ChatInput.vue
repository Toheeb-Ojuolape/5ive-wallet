<template>
  <div class="formContainer">
    <form @submit.prevent="sendMessage">
      <input
        ref="chatBox"
        v-model="message"
        class="chatBox rounded-l-pill"
        color="red"
        flat
        placeholder="Type something here"
        solo
      >
      <v-btn
        class="sendButton"
        :color="BRANDCOLOR"
        flat
        @click="sendMessage"
      ><v-icon icon="mdi-send" /></v-btn>
    </form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { BRANDCOLOR } from '../../constants/constant'
  import { handleErrors } from '../../utils/handlers'

  export default defineComponent({
    emits: ['addmessage'],
    setup (props, { emit }) {
      const message = ref('')

      const sendMessage = () => {
        if (message.value) {
          emit('addmessage', message.value)
          message.value = ''
        } else {
          handleErrors({message:'You need to type something'})
        }
      }

      return {
        message,
        sendMessage,
        BRANDCOLOR,
      }
    },
  })
</script>

<style scoped>
.chatField {
  position: absolute;
  bottom: 0;
  width: 90%;
}

.chatBox {
  width: 100%;
  padding: 0px 0px 0px 10px;
  height: 50px;
  border: 1px solid;
}

.formContainer {
  position: relative;
  width: 100%;
  height: 70px;
  padding: 0px;
  margin: 0px;
}

input:focus {
  outline: none;
}

.plusIcon {
  position: absolute;
  left: 0;
  margin: 17px 0px 0px 40px;
  cursor: pointer;
}

.sendButton {
  position: absolute;
  right: 0;
  margin: 5px 10px 0px 10px;
}
</style>
