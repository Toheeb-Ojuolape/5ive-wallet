<template>
  <v-card class="rounded-xl pa-6 my-3" flat>
    <h3>PFI Statistics</h3>

    <h4 class="my-4">Most rated PFIs</h4>
    <div v-for="(pfi, i) in groupedPFIsbyRating" :key="i">
      <PFIChart :name="pfi.pfi" :value="pfi.rating" />
    </div>

    <div v-if="transactions.length">
    <h4>Most used PFIs</h4>
    <div v-for="(pfi, i) in groupTransactionsByPFIs" :key="i">
      <PFIChart :name="pfiName(pfi.did)" :value="pfi.value" />
    </div>
  </div>
  </v-card>
</template>

<script>
import { useTransactionStore } from "@/stores/transactions.store";
import { mapState } from "pinia";
import PFIChart from "@/elements/Statistics/PFIChart.vue";
import { getPFINameByDid } from "@/utils/formatter";
export default {
  components: { PFIChart },
  computed: {
    ...mapState(useTransactionStore, {
      groupedPFIsbyRating: "groupedPFIsbyRating",
      groupTransactionsByPFIs: "groupTransactionsByPFIs",
      transactions: "transactions"
    }),
  },

  methods: {
    pfiName(did) {
      return getPFINameByDid(did);
    },
  },
};
</script>


<style scoped>
h4{
  border-bottom: 1px solid #dde2e9;
  padding: 0px 0px 6px 0px
}
</style>
