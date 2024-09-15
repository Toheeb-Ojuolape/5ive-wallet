<template>
  <BottomSheet :isActive="isActive" @closeBtn="closeBtn">
    <div>
      <div>
        <div style="width: 200px; margin: auto" class="d-flex justify-center">
          <v-img alt="upload" src="../../assets/upload.svg" />
        </div>

        <h2 class="mb-3">Upload your DID JSON file to login</h2>
        <v-file-input v-model="file" label="DID JSON file" variant="outlined" />

        <v-btn
          size="x-large"
          variant="outlined"
          block
          rounded="pill"
          @click="handleSync"
          :disabled="!file"
          :loading="loading"
        >
          Sync Data</v-btn
        >
      </div>
    </div>
  </BottomSheet>
</template>

<script>
import authService from "@/services/authService";
import BottomSheet from "../../components/BottomSheet/BottomSheet.vue";
import { handleSuccess } from "@/utils/handlers";

export default {
  components: { BottomSheet },
  props: {
    isActive: {
      type: Boolean,
    },
  },
  data() {
    return {
      file: null,
      loading: false,
    };
  },
  methods: {
    async handleSync() {
      try {
        this.loading = true;
        await authService.syncDid(this.file);
        this.loading = false;
        handleSuccess("Data synced successfully. Logging in...");
        setTimeout(() => {
          location.reload();
        }, 2000);
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.description {
  max-width: 350px;
  margin: auto;
}
</style>
