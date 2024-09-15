<template>
    <div class="my-5">
  <v-btn
    @click="handleLogout"
    size="x-large"
    class="rounded-lg"
    block
    color="#eb3f3f"
    variant="outlined"
    >Log out</v-btn
  >
    </div>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      localStorage.clear()
      window.location.href = "/"
    },
  },
};
</script>
