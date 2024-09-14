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
          :country="user?.country"
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
          >Update Profile</v-btn
        >
      </div>
    </v-form>
  </v-card>
</template>

<script>
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
    }),
  },

  data() {
    return {
      name: "",
      country: null,
    };
  },

  methods: {
    selectCountry(country) {
      this.country = country;
    },
    updateProfile() {
      this.userStore.setUser({
        name: this.name ? this.name : this.user?.name,
        country: this.country ? this.country : this.user?.country,
      });
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
