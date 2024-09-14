<template>
  <bottom-sheet :isActive="isActive" @closeBtn="closeBtn">
    <v-window v-model="step">
      <v-window-item :value="1">
        <div class="mx-4">
          <h2>Thank you for patronizing <br/> {{ pfiName(offering) }}!</h2>
        
          <div class="d-flex justify-center text-center">
          <v-form class="my-3">
            <p class="rating-label">Kindly rate the PFI</p>
            <v-rating
              v-model="rating"
              density="compact"
              size="x-large"
              hover
              color="#FFD600"
              clearable
            ></v-rating>
          </v-form>
          </div>

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
import SuccessScreen from "@/elements/SuccessScreen.vue";
import BottomSheet from "../../components/BottomSheet/BottomSheet.vue";
import { getPFIName } from "@/utils/formatter";
import { Offering } from "@tbdex/http-client";
import { useOfferingsStore } from "@/stores/offerings.store";
export default {
  components: {  SuccessScreen, BottomSheet },
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



<style scoped>
.rating-label{
  font-size: 18px;
  margin: 10px 0px
}
</style>