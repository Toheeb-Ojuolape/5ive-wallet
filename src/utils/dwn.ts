import { Web5 } from "@web5/api";

let web5Instance = null;

async function getWeb5Instance() {
  if (!web5Instance) {
    const { web5 } = await Web5.connect({ password: "YOUR_PASSWORD" });
    web5Instance = web5; // Cache the instance
  }
  return web5Instance;
}

export default {
  async createDidRecord(customerDid) {
    const web5 = await getWeb5Instance();
    const { record } = await web5.dwn.records.create({
      data: customerDid,
      message: {
        dataFormat: "application/json",
        tags: {
          auth: "customerDid",
        },
      },
    });
  },

  async queryDid() {
    const web5 = await getWeb5Instance();
    const { records } = await web5.dwn.records.query({
      message: {
        filter: {
          tags: {
            auth: "customerDid",
          },
        },
      },
    });
    return records;
  },
};
