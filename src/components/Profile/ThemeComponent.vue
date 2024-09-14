<template>
  <v-card flat class="px-4 py-2 my-4 rounded-lg" height="90px">
    <h4>Theme</h4>
    <div class="d-flex justify-space-between">
      <div class="mt-4">{{ theme === "dark" ? "Dark" : "Light" }} Mode</div>
      <v-switch
        @change="handleChangeTheme"
        inset
        :model-value="theme === 'dark'"
        color="#ffbf02"
      ></v-switch>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      theme: localStorage.getItem("theme"),
    };
  },
  methods: {
    handleChangeTheme() {
      if (!this.theme) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", this.theme === "dark" ? "light" : "dark");
      }
      location.reload()
    },
  },
};
</script>
