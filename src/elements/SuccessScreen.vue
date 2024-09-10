<template>
  <div class="text-center d-flex justify-center">
    <div class="success-screen">
      <img src="../assets/success.gif" width="200px"/>

      <div>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
    </div>

    <div>
      <v-btn @click="handleContinue" block :color="BRANDCOLOR" size="x-large" rounded="pill"> {{ btnTitle }}</v-btn>
    </div>
    </div>
  </div>
</template>

<script>
import { BRANDCOLOR } from "@/constants/constant";

export default {
  props: {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    btnTitle:{
      type: String
    }
  },
  data() {
    return {
      BRANDCOLOR,
    };
  },

  methods:{
    handleContinue(){
        this.$emit("handleContinue")
    }
  }
};
</script>


<style scoped>
.success-screen > *{
    margin: 0px 0px 18px 0px
}
</style>