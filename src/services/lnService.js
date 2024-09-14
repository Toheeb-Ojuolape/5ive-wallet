import { LightningAddress } from "@getalby/lightning-tools";

const ln = new LightningAddress(
  process.env.VUE_APP_MERCHANT_LN_ADDRESS || "toheeb@getalby.com"
);
export default {
  async generateInvoice() {
    await ln.fetch();
    const invoice = await ln.requestInvoice({
      satoshi: 1000,
      comment: "One year subscription to 5ive wallet",
    });

    return invoice;
  },

  async checkWebln() {
    if (window.webln) {
      await window.webln.enable();
      return window.webln._isEnabled;
    }
  },
};
