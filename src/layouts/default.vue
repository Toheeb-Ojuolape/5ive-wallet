<template>
  <v-app :style="`background: ${(theme === 'dark' || $route.path =='/') ? '#15141a' : '#f8fafc'}`">
    <v-responsive
      class="mx-auto layout"
      max-width="600px"
      width="100%"
      height=100vh
      :style="`background: ${theme === 'dark' ? '' : '#f8fafc'}; border: ${
        theme === 'dark' ? '#f8fafc' : ''
      }'`"
    >
      <slot></slot>
      <BottomMenu v-if="$route.path != '/'" />
    </v-responsive>
  </v-app>
</template>

<script>
import BottomMenu from "@/components/BottomMenu.vue";

export default {
  name: "AppLayout",
  components: { BottomMenu },
  data() {
    return {
      theme: localStorage.getItem("theme"),
      route: this.$router.name
    };
  },
};
</script>
