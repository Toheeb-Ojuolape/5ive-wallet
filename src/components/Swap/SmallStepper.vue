<template>
  <div class="stepper">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="stepper-item fade-in"
      :style="`--fade-delay: ${index / 5}s`"
    >
      <!-- Line before stepper header -->
      <div class="stepper-line" v-if="index !== 0"></div>

      <div class="stepper-header">
        <div class="step-number">
          <v-icon color="#00ab73">mdi-sync</v-icon>
        </div>
        <div v-if="exchangerate" class="step-title">
          Exchange Rate: {{ exchangerate }}
        </div>
      </div>

      <!-- Line after stepper header -->
      <div class="stepper-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      required: true,
    },
    exchangerate: {
      type: [String, Number],
    },
  },
};
</script>

<style scoped>
.stepper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
}

.stepper-item {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}

.stepper-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fdfdfb;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-right: 10px;
}

.step-title {
  font-size: 14px;
}

.step-description {
  font-size: 14px;
  margin-left: 40px;
}

.stepper-line {
  position: absolute;
  top: 0;
  left: 15px;
  width: 2px;
  height: 100%;
  background-color: #ddd;
  z-index: -1;
}

@media (max-width: 768px) {
  .step-title {
    font-size: 16px;
  }
  .step-description {
    font-size: 13px;
  }
}
</style>
