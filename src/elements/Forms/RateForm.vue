<template>
  <bottom-sheet :isActive="isActive" @closeBtn="closeBtn">
    <v-window v-model="step">
      <v-window-item :value="1">
        <div>
          <h2>Thank you for patronizing {{ pfiName(offering) }}!</h2>
          <div>Kindly rate the PFI</div>

          <v-form class="my-3">
            <v-rating
              v-model="rating"
              density="comfortable"
              size="x-large"
              hover
              color="#FFD600"
            ></v-rating>

            <div class="mt-4">
              <v-btn
                @click="handleSubmit"
                rounded="pill"
                block
                variant="outlined"
                size="x-large"
              >
                Submit</v-btn
              >
            </div>
          </v-form>
        </div>
      </v-window-item>

      <v-window-item :value="2">
        <SuccessScreen
          :title="'PFI rated successfully!'"
          :message="'Great, you have successfully rated this PFI'"
          @handleContinue="handleContinue"
          :btnTitle="'Continue'"
        />
      </v-window-item>
    </v-window>
  </bottom-sheet>
</template>

<script>
import CountrySelector from "@/elements/Countries/CountrySelector.vue";
import SuccessScreen from "@/elements/SuccessScreen.vue";
import BottomSheet from "../../components/BottomSheet/BottomSheet.vue";
import { getPFIName } from "@/utils/formatter";
import { Offering } from "@tbdex/http-client";
import { useOfferingsStore } from "@/stores/offerings.store";
export default {
  components: { CountrySelector, SuccessScreen, BottomSheet },
  data() {
    return {
      step: 1,
      rating: 0,
    };
  },
  props: {
    isActive: {
      type: Boolean,
    },
    offering: {
      type: Offering,
    },
  },

  methods: {
    pfiName(offering) {
      return getPFIName(offering);
    },

    handleSubmit(){
        // store the rating of PFI in localStorage
        const offeringStore = useOfferingsStore()
        offeringStore.submitRating({
            pfi: getPFIName(this.offering),
            rating: this.rating,
            did: this.offering.metadata.from
        })
        this.step++
    },

    handleContinue(){
        this.$emit('handleContinue')
    }
  },
};
</script>
