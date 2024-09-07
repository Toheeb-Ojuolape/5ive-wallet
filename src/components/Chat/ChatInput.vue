<template>
  <div class="formContainer">
    <form @submit.prevent="sendButton">
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
        color="#0582D2"
        flat
        @click="sendMessage"
      ><v-icon icon="mdi-send" /></v-btn>
    </form>

    <input
      id="image"
      ref="image"
      accept="image/*"
      hidden
      type="file"
      @change="setImage"
    >
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    emits: ['addmessage'],
    setup (props, { emit }) {
      const message = ref('')

      const sendMessage = () => {
        emit('addmessage', message.value)
        message.value = ''
      }

      return {
        message,
        sendMessage,
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
  background: #f8f8f9 !important;
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
  color: white !important;
  right: 0;
  margin: 5px 10px 0px 10px;
}
</style>
