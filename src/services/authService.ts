import { BearerDid, DidDht } from "@web5/dids";

const storedDid = localStorage.getItem("customerDid");

export default {
  async getDid(): Promise<BearerDid> {
    let did: BearerDid;
    if (storedDid) {
      did = await DidDht.import({
        portableDid: JSON.parse(this.storedDid),
      });
    } else {
      did = await DidDht.create({
        options: { publish: true },
      });
      const exportedDid = await did.export();
      localStorage.setItem("customerDid", JSON.stringify(exportedDid));
    }
    return did;
  },
};
