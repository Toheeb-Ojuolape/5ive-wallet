<template>
  <v-card flat class="px-4 my-4 pt-4 pb-6 rounded-lg">
    <h4>Security</h4>

    <div class="security-card-grid mt-2">
      <v-card rounded="lg" color="#f8fafc" flat>
        <div><v-icon color="#32c36c">mdi-check-circle</v-icon></div>
        <div class="my-2">Web5 DID enabled</div>
      </v-card>

      <v-card rounded="lg" color="#f8fafc" flat>
        <div>
          <v-icon :color="vcs?.length ? '#32c36c' : '#ff2000'">
            {{ vcs.length ? "mdi-check-circle" : "mdi-close-circle" }}</v-icon
          >
        </div>
        <div class="my-2">
          {{ vcs.length ? "VC available" : "VC not available" }}
        </div>
      </v-card>
    </div>

    <div class="my-3">
      <label>Your DID (export it to login on 5ive wallet)</label>
      <DIDComponent />
    </div>
  </v-card>
</template>

<script>
import DIDComponent from "@/elements/DIDComponent.vue";
import { useUserStore } from "@/stores/user.store";
import { mapState } from "pinia";

export default {
  components: { DIDComponent },
  computed: {
    ...mapState(useUserStore, {
      vcs: "vcs",
    }),
  },
};
</script>

<style scoped>
.security-card-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
}

.security-card-grid > * {
  padding: 20px 15px;
}
</style>
