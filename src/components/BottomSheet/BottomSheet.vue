<template>
  <v-bottom-sheet
    rounded="pill"
    :model-value="isActive"
    class="bottom-sheet-wrapper"
    position="relative"
    persistent=""
  >
    <v-card class="mx-auto bottom-sheet pa-6" height="500px" width="100%" max-width="500px">
      <div class="d-flex justify-end pa-3">
        <v-col cols="auto">
          <v-btn
            @click="closeBtn"
            density="compact"
            icon="mdi-close"
            size="large"
            flat
          />
        </v-col>
      </div>

      <slot></slot>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "BottomSheet",
  props: {
    isActive: {
      type: Boolean,
    },
  },

  methods: {
    closeBtn() {
      this.$emit("closeBtn");
    },
  },
};
</script>

<style scoped>
.bottom-sheet-wrapper {
  position: fixed;
  top: 0;
  left: 0;
}

.bottom-sheet {
  border-radius: 60px 60px 0px 0px !important;
}
</style>
