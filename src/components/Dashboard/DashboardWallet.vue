<template>
  <div class="bg-black text-center px-9 py-6">
    <div class="d-flex justify-end">
      <v-col cols="auto">
        <v-btn
          density="compact"
          icon="mdi-bell-outline"
          size="x-large"
        />
      </v-col>
    </div>

    <div>
      <v-btn
        color="#e9f0f5"
        rounded="pill"
        size="small"
      >Activity balance</v-btn>
      <h1>{{ amount }}</h1>
    </div>

    <div class="dashboard-actions">
      <v-btn rounded="pill" size="large"> Send</v-btn>
      <v-btn rounded="pill" size="large" variant="outlined"> Swap</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    data () {
      return {
        amount: '1000',
      }
    },
  })
</script>

<style scoped>
.dashboard-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 15px 0px;
}
</style>
