<template>
  <div>
    <div class="d-flex justify-space-between">
    <h3 class="mt-4">Recent transactions</h3>
    <v-btn variant="text" class="mt-3" to="/history">See all <v-icon size="small">mdi-arrow-right</v-icon></v-btn>
  </div>

    <Transaction :length="5" />
  </div>
</template>

<script>
import Transaction from "../History/TransactionComponent.vue";
export default {
  components: { Transaction },
};
</script>
