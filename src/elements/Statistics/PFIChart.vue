<template>
  <div class="d-flex my-5">
    <h3 class="pfi-name">{{ name }}</h3>
    <div style="position: relative; display: flex">
      <div class="pfi-bar" :style="`width:${Math.min(value,5) * 50}px`">...</div>
      <div class="pfi-rating ml-2 mt-2">{{ value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
    },
    value:{
        type: Number
    }
  },
};
</script>

<style scoped>
.pfi-name {
  max-width: 120px;
  font-size: 17px;
  width: 100px
}

.pfi-bar {
  height: 25px;
  margin: 6px 0px 0px 20px;
  width: 10px;
  background: #ffbf02;
  color: #ffbf02;
  transition: width ease-in 3s;
}

.pfi-rating{
    font-size: 14px
}
</style>
