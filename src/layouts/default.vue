<template>
    <v-app>
      <v-responsive
        class="align-centerfill-height mx-auto layout"
        max-width="500px"
        width="100%"
        height="95vh"
        :style="`background: ${theme === 'dark' ? '' : '#f8fafc'}; border: ${theme === 'dark' ? '#f8fafc' : ''}'`"
      >
        <slot></slot>
        <BottomMenu v-if="$route.path != '/'" />
      </v-responsive>
    </v-app>
  </template>
  
  <script>
import BottomMenu from '@/components/BottomMenu.vue';

  export default {
    name: "AppLayout",
    components: {BottomMenu},
    data() {
      return {
        theme: localStorage.getItem("theme"),
      };
    },
  };
  </script>
  
  