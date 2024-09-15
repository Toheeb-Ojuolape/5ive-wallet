<template>
  <div>
    <div class="did-component">
      <p class="did-text">{{ storedDid.uri }}</p>
      <div>
        <v-btn @click="exportDid" flat icon><v-icon>mdi-cloud-download-outline</v-icon></v-btn>
      </div>
    </div>
    <span class="info" @click="handleWhatIsDid"> What is a DID?</span>
  </div>
</template>

<script>
import authService from '@/services/authService';
import { handleSuccess } from '@/utils/handlers';

export default {
  data() {
    return {
      storedDid: JSON.parse(localStorage.getItem("customerDid")),
    };
  },

  methods: {
    handleWhatIsDid() {
      window.open(
        "https://developer.tbd.website/docs/web5/decentralized-identifiers/what-are-dids",
        "_blank"
      );
    },

    exportDid(){
        authService.exportDid(this.storedDid, "5ive-wallet-did")
        handleSuccess("DID exported successfully")
    }
  },
};
</script>

<style scoped>
.did-component {
  border: 1px solid #e0e0e0;
  padding: 5px 10px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  margin: 5px 0px
}

.did-component > p {
  max-width: 400px;
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  margin: 10px 0px;
}

.info {
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
}
</style>
