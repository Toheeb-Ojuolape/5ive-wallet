<template>
  <v-app>
    <v-main>
      <v-responsive
        class="align-centerfill-height mx-auto"
        height="95vh"
        max-width="500"
        style="background: #f8fafc"
      >
        <router-view />
        <BottomMenu />
      </v-responsive>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
//
</script>

<style scoped></style>
