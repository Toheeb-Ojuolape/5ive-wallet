<template>
  <BottomSheet :isActive="isActive" @closeBtn="closeBtn">
    <div class="d-flex justify-center text-center">
      <div>
        <div style="width: 200px; margin: auto" class="d-flex justify-center">
          <v-img alt="Vue logo" src="../../assets/hfive.gif" />
        </div>

        <h2>BearerDid Generated Successfully!</h2>
        <p class="my-3 description">
          We've successfully generated a BearerDid for you. This would be used
          to sign your transactions
        </p>

        <v-btn size="x-large" variant="outlined" block rounded="pill" @click="goToHome"> Let's go!</v-btn>
      </div>
    </div>
  </BottomSheet>
</template>

<script>
import BottomSheet from "../../components/BottomSheet/BottomSheet.vue";

export default {
  components: { BottomSheet },
  props: {
    isActive: {
      type: Boolean,
    },
  },
  methods: {
    handleContinue() {
      this.$emit("handleContinue");
    },
    closeBtn() {
      this.$emit("closeBtn");
    },

    goToHome() {
      window.location.href = "/home"
    },
  },
};
</script>



<style scoped>
.description{
    max-width: 350px;
    margin: auto;
}
</style>