<template>
  <bottom-sheet :isActive="isActive" @closeBtn="closeBtn">
    <v-window :model-value="vcstep">
      <v-window-item :value="1">
        <div>
          <h2>We need some details about you!</h2>
          <div style="font-size: 14px">
            To provide you with a <strong>Verifiable Credential</strong> to sign
            your transaction, we need to know your name and location (Don't
            worry, we won't share your details with anyone 🤐)
          </div>

          <v-form class="my-3">
            <label>Name</label>
            <v-text-field
              v-model="name"
              single-line
              variant="outlined"
              density="comfortable"
              style="height: 58px"
            />

            <country-selector :name="'country'" @handleInput="handleInput" />
            <div class="mt-4">
              <v-btn
                :loading="isVcLoading"
                @click="handleCreateVc"
                rounded="pill"
                block
                variant="outlined"
                size="large"
                :disabled="!name && country"
              >
                Submit</v-btn
              >
            </div>
          </v-form>
        </div>
      </v-window-item>

      <v-window-item :value="2">
        <SuccessScreen
          :title="'Verifiable Credentials Created!'"
          :message="'Great, now that we can share your VC with your selected PFI, you can now request a quote'"
          @handleContinue="handleContinue"
        />
      </v-window-item>
    </v-window>
  </bottom-sheet>
</template>

<script>
import CountrySelector from "@/elements/Countries/CountrySelector.vue";
import { useMessageStore } from "@/stores/message.store";
import { useOfferingsStore } from "@/stores/offerings.store";
import { mapState } from "pinia";
import SuccessScreen from "@/elements/SuccessScreen.vue";
import BottomSheet from "../../components/BottomSheet/BottomSheet.vue";
export default {
  components: { CountrySelector, SuccessScreen, BottomSheet },
  data() {
    return {
      name: "",
      country: "NG",
    };
  },
  props: {
    isActive: {
      type: Boolean,
    },
  },

  computed: {
    ...mapState(useOfferingsStore, {
      isVcLoading: "isVcLoading",
      vcstep: "vcstep",
    }),
  },

  methods: {
    handleInput(e) {
      this.country = e.country;
    },

    handleCreateVc() {
      const offeringStore = useOfferingsStore();
      offeringStore.requestVc({
        name: this.name,
        country: this.country,
      });
    },

    handleContinue() {
      const messageStore = useMessageStore();
      messageStore.addMessage(
        "SELLER",
        "Great, we have received your Verifiable Credential, now kindly enter the amount you would like to send"
      );
      this.$emit("closeBtn");
    },
  },
};
</script>