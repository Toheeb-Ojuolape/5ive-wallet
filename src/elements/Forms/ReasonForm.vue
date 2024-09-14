<template>
  <BottomSheet :isActive="isActive" @closeBtn="closeBtn">
    <div>
      <v-form>
        <label> Reason for cancellation</label>
        <v-textarea v-model="reason"> </v-textarea>
      </v-form>

      <div class="my-4">
        <v-btn
          :loading="loading"
          @click="submitClose"
          block
          rounded="pill"
          size="x-large"
          >Submit</v-btn
        >
      </div>
    </div>
  </BottomSheet>
</template>

<script>
import BottomSheet from "@/components/BottomSheet/BottomSheet.vue";
import { useSwapStore } from "@/stores/swap.store";
import { mapState } from "pinia";
export default {
  data() {
    return {
      reason: "",
    };
  },

  components: {
    BottomSheet,
  },

  computed: {
    ...mapState(useSwapStore, {
      loading: "loading",
    }),
  },

  methods: {
    closeBtn() {
      this.$emit("closeBtn");
    },
    submitClose() {
      this.$emit("submitClose", this.reason);
    },
  },
};
</script>
