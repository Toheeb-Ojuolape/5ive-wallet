<template>
  <v-card
    color="#207CFE"
    flat
    style="max-width:75%;
          padding: 10px 20px 10px 20px;
          border-radius: 15px 0px 15px 15px;
          float: right;
          margin: 5px 20px 0px 20px;
          min-width: 140px;"
  >
    <div class="text-left">
      <!-- <div style="font-weight: 600" class="white--text">{{ messages.name }}</div> -->
      <div class="white--text">{{ messages.message }}</div>
    </div>
    <div class="text-right">
      <span class="white--text timestamp">{{ messages.time }}</span>
    </div>
  </v-card>
</template>

<script lang="ts">
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
