<template>
  <v-app>
    <v-responsive
      class="align-centerfill-height mx-auto"
      height="99vh"
      max-width="500px"
      width="100%"
      :style="`background: ${theme === 'dark' ? '' : '#f8fafc'}; border: ${theme === 'dark' ? '#f8fafc' : ''}'`"
    >
      <router-view />
      <BottomMenu v-if="$route.path != '/'" />
    </v-responsive>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      theme: localStorage.getItem("theme"),
    };
  },
};
</script>

<style scoped></style>
