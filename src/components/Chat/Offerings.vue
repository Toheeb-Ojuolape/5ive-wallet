<template>
  <div class="offering-card">
    <div v-for="(offering, i) in offerings" :key="i">
      <OfferingCard :offering="offering" :index="i"/>
    </div>
  </div>
</template>

<script>
import OfferingCard from "@/elements/OfferingCard.vue";
export default {
  components: { OfferingCard },
  props: {
    offerings: {
      type: Array,
    },
  },
};
</script>



<style scoped>
.offering-card{
    display: flex;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    overflow-x: scroll
}
</style>