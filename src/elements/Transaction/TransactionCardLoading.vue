<template>
    <div class="transaction-card">
      <v-skeleton-loader type="list-item-avatar-three-line" />
    </div>
  </template>
  
  <script>
  import { getDate, getPFIName} from "@/utils/formatter";
  
  export default {
    props: {
      transaction: {
        type: Object,
      },
    },
  
    methods: {
      pfiName(did) {
        return getPFIName(did);
      },
  
      getDateValue(date) {
        return getDate(date);
      },

    },
  };
  </script>
  
  <style scoped>
  .transaction-card {
    border-bottom: 1px solid #9ba3a6;
  }
  
  
  .date{
      font-size: 10px
  }
  
  h3{
      margin:-5px 0px;
      padding: 0px;
      font-size: 17px
  }
  </style>
  