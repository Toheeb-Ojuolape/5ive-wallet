<template>
  <BottomSheet :isActive="isActive" @closeBtn="closeBtn">
    <div>
      <v-form>
        <label> Reason for cancellation</label>
        <v-textarea v-model="reason"> </v-textarea>
      </v-form>

      <div class="my-4">
        <v-btn @click="submitClose" block rounded="pill" size="x-large"
          >Submit</v-btn
        >
      </div>
    </div>
  </BottomSheet>
</template>

<script>
import BottomSheet from "@/components/BottomSheet/BottomSheet.vue";
export default {
  data() {
    return {
      reason: "",
    };
  },

  components: {
    BottomSheet,
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
