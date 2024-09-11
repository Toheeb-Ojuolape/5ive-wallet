<template>
  <v-app>
      <v-responsive
        class="align-centerfill-height mx-auto"
        height="99vh"
        max-width="500px"
        width="100%"
        style="background: #f8fafc"
      >
        <router-view />
        <BottomMenu />
      </v-responsive>
  </v-app>
</template>

<script lang="ts" setup>
//
</script>

<style scoped></style>
