<template>
  <v-main
    class="d-flex justify-center text-center overflow-y-auto"
    style="height: 100vh; background: #15141a"
  >
    <div>
      <h3 class="text-white text-start ma-5">5ive</h3>
      <div class="progress-dots">
        <div v-for="(_, i) in length" :key="i" :class="dotClass(i)"></div>
      </div>

      <v-window v-model="window">
        <v-window-item v-for="n in length" :key="n">
          <OnboardingScreen :index="n" />
        </v-window-item>
      </v-window>

      <div class="mt-6">
        <v-btn
          class="button"
          rounded="pill"
          color="#302e38"
          size="x-large"
          @click="handleClick"
          :loading="loading"
        >
          Get Started
        </v-btn>
      </div>

      <div class="login-text">
        Already have an account?
        <button
          style="text-decoration: underline"
          variant="text"
          @click="handleLogin"
          >Login</button
        >
      </div>
    </div>

    <GenerateAuthDid :isActive="isActive" @closeBtn="isActive = false" />
    <UploadAuthDid :isActive="isLogin" @closeBtn="isLogin = false" />
  </v-main>
</template>

<script>
import OnboardingScreen from "@/components/Onboarding/OnboardingScreen.vue";
import GenerateAuthDid from "@/components/Onboarding/GenerateAuthDid.vue";
import UploadAuthDid from "@/components/Onboarding/UploadAuthDid.vue";
import authService from "@/services/authService";
import { handleErrors } from "@/utils/handlers";

export default {
  components: { OnboardingScreen, GenerateAuthDid, UploadAuthDid },

  data() {
    return {
      length: 3,
      window: 0,
      isActive: false,
      storedDid: localStorage.getItem("customerDid"),
      loading: false,
      isLogin: false,
    };
  },

  mounted() {
    this.startSwipe();
  },

  methods: {
    startSwipe() {
      setInterval(() => {
        this.window = (this.window + 1) % 3;
      }, 3500);
    },
    dotClass(index) {
      return {
        dot: true,
        "active-dot": this.window === index,
        "inactive-dot": this.window !== index,
      };
    },

    async handleClick() {
      try {
        this.loading = true;
        if (this.storedDid) {
          this.$router.push("/home");
        } else {
          await authService.getDid();
          this.isActive = true;
        }
        this.loading = false;
      } catch (error) {
        handleErrors(error);
        this.loading = false;
      }
    },

    handleLogin() {
      this.isLogin = true;
    },
  },
};
</script>

<style scoped>
@import "../styles/onboarding.css";
</style>
