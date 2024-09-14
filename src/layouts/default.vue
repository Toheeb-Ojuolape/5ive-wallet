<template>
  <v-app>
    <v-responsive
      class="align-centerfill-height mx-auto layout"
      height="99vh"
      max-width="500px"
      width="100%"
      :style="`background: ${theme === 'dark' ? '' : '#f8fafc'}; border: ${theme === 'dark' ? '#f8fafc' : ''}'`"
    >
      <slot></slot>
    </v-responsive>
  </v-app>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      theme: localStorage.getItem("theme"),
    };
  },
};
</script>

