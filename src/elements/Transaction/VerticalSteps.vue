<template>
  <div class="stepper">
    <div v-for="(step, index) in steps" :key="index" class="stepper-item">
      <div class="stepper-header">
        <div class="step-number">
          <v-icon color="#00ab73">mdi-check</v-icon>
        </div>
        <div class="step-title">
          {{ stepTitle(step, index) }}
        </div>
      </div>

      <div class="step-description">
        <div style="font-size:15px">{{ stepDescription(step, index) }}</div>
        <span style="font-size: 12px"> {{ getDateValue(step.metadata.createdAt) }}</span>
      </div>

      <div v-if="index < steps.length - 1" class="stepper-line"></div>
    </div>
  </div>
</template>

<script>
import { getStepTitle, getStepDescription, getDate } from "@/utils/formatter";

export default {
  props: {
    steps: {
      type: Array,
      required: true,
    },
  },

  methods: {
    stepTitle(step, index) {
      return getStepTitle(step, index, this.steps);
    },
    stepDescription(step, index){
        return getStepDescription(step, index, this.steps);
    },
    getDateValue(date){
        return getDate(date)
    }
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
  font-weight: 600;
  font-size: 18px;
  color: #333;
}

.step-description {
  font-size: 14px;
  color: #666;
  margin-left: 40px;
}

.stepper-line {
  position: absolute;
  top: 40px;
  left: 15px;
  width: 2px;
  height: 100%;
  background-color: #ddd;
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
