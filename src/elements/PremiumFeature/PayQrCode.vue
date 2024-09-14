<template>
  <div class="text-center">Scan/Copy the Lightning Invoice to pay:</div>

  <div class="d-flex justify-center">
    <VueQrcode @click="payInvoice" :value="invoice.paymentRequest" />
  </div>

  <invoiceInput :invoice="invoice.paymentRequest" />

  <div class="d-flex justify-center text-center">
    <div class="my-3">
      <v-progress-circular indeterminate></v-progress-circular>
      <p class="my-3">Waiting for payment...</p>
    </div>
  </div>
</template>

<script>
import lnService from "@/services/lnService";
import VueQrcode from "vue-qrcode";
import InvoiceInput from "./InvoiceInput.vue";
import authService from "@/services/authService";
export default {
  components: {
    VueQrcode,
    InvoiceInput,
  },
  props: {
    invoice: {
      type: Object,
    },
  },

  created() {
    this.listenInvoice(this.invoice);
  },

  methods: {
    async payInvoice() {
      const isWebLn = await lnService.checkWebln();
      console.log(isWebLn);
      if (isWebLn) {
        await window.webln.sendPayment(this.invoice.paymentRequest);
      }
    },
    async listenInvoice(invoice) {
      const intervalId = setInterval(async () => {
        const paid = await invoice.isPaid();
        if (paid) {
          clearInterval(intervalId);
          authService.setUser({
            isSubscribed: true,
            subscriptionDate: Date.now(),
          });

          this.$emit("handleNext");
        }
      }, 3000);
    },
  },
};
</script>
