<template>
  <div className="invoiceContainer">
    <span>{{invoice && invoice.slice(0, 20)+"..."}}</span>
    <v-icon @click="copyInvoice">mdi-content-copy</v-icon>
  </div>
</template>

<script>
import { handleSuccess } from "@/utils/handlers";

export default {
  props: {
    invoice: {
      type: String,
    },
  },

  methods: {
    copyInvoice() {
      navigator.clipboard.writeText(this.invoice);
      handleSuccess("Invoice copied successfully");
    },
  },
};
</script>

<style scoped>
.invoiceContainer {
  padding: 12px 8px;
  border: solid 1px #656565;
  border-radius: 8px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  max-width: 280px
}
</style>
