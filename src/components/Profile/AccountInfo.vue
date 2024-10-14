<template>
  <v-card flat class="pa-4 rounded-lg">
    <h4>Account Information</h4>

    <v-form class="profile-form">
      <div>
        <label>Name</label>
        <v-text-field
          class="rounded-lg"
          variant="outlined"
          density="comfortable"
          :placeholder="user?.name"
          v-model="name"
        />

        <CountrySelector
          :countryvalue="user?.country"
          @handleInput="selectCountry"
        />
      </div>

      <div>
        <v-btn
          @click="updateProfile"
          block
          variant="outlined"
          rounded="pill"
          size="x-large"
          :loading="loading"
          >Update Profile</v-btn
        >
      </div>
    </v-form>
  </v-card>
</template>

<script>
import { DEFAULTCOUNTRY } from "@/constants";
import CountrySelector from "@/elements/Countries/CountrySelector.vue";
import { useUserStore } from "@/stores/user.store";
import { mapState } from "pinia";
export default {
  components: { CountrySelector },
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },

  computed: {
    ...mapState(useUserStore, {
      user: "user",
      vcs: "vcs",
      themecolor: "themecolor",
      theme: "theme"
    }),
  },

  data() {
    return {
      name: "",
      country: this.user?.country || DEFAULTCOUNTRY,
      loading: false,
    };
  },

  methods: {
    selectCountry(country) {
      this.country = country;
    },
    async updateProfile() {
      // generate vc from profile update if user doesn't already a vc
      this.loading = true;
      if (!this.vcs.length) {
        await this.userStore.requestVc({
          name: this.name ? this.name : this.user?.name,
          country: this.user?.country ? this.user?.country: DEFAULTCOUNTRY,
        });
        this.loading = false;
        return;
      }

      await this.userStore.setUser({
        name: this.name ? this.name : this.user?.name,
        country: this.country ? this.country : this.user?.country,
        themecolor: this.themecolor,
        theme: this.theme
      });

      this.loading = false;
    },
  },
};
</script>

<style scoped>
.profile-form {
  margin: 20px 0px 10px 0px;
  padding: 0px 10px;
}

.profile-form > * {
  margin: 25px 0px;
}
</style>
