<template>
  <BottomSheet :isActive="isActive" @closeBtn="closeBtn">
    <div>
      <div>
        <div style="width: 200px; margin: auto" class="d-flex justify-center">
          <v-img alt="upload" src="../../assets/upload.svg" />
        </div>

        <h2 class="mb-3">Upload your DID file to login</h2>
        <v-file-input v-model="file" label="DID JSON file" variant="outlined" />

        <v-btn
          size="x-large"
          variant="outlined"
          block
          rounded="pill"
          @click="handleSync"
          :disabled="!file"
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
import { handleErrors } from "@/utils/handlers";

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
    };
  },
  methods: {
    async handleSync() {
      try {
        await authService.syncDid(this.file);
      } catch (error) {
        handleErrors(error);
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
