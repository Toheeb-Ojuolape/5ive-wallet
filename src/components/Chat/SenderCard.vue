<template>
  <v-card
    color="#DEDFE3"
    flat
    style="
        max-width: 75%;
        padding: 10px 20px 10px 20px;
        border-radius: 15px 15px 15px 0px;
        float: left;
        margin: 10px 20px 0px 20px;
      "
  >
    <!-- <div style="font-weight: 600">{{ messages.name }}</div> -->
    <div class="text-left">{{ messages.message }}</div>
    <div class="text-left">
      <span class="black--text timestamp">{{ messages.time }}</span>
    </div>
  </v-card>
</template>

  <script>
  export default {
    props: {
      messages: {
        type: Object,
      },
    },
  }
  </script>

  <style scoped>
  .timestamp {
    font-size: 9px;
  }

  .buyerImageContainer{
    background:#207CFE;
    color:white;
    padding:9px;
    border-radius:10px;
    margin:10px 0px 0px 0px
  }

  .sellerImageContainer{
    background:#DEDFE3;
    color:black;
    padding:9px;
    border-radius:10px;
    max-width:180px;
    margin:10px 0px 0px 0px
  }

  </style>
