<template>
  <div>
    <div class="onboarding">
      <div class="container">
       
        <iframe height="300px" width="300px" :src="onboarding[index-1].image"></iframe>

        <h2>{{ onboarding[index-1].title }}</h2>

        <p>{{ onboarding[index-1].text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OnboardingScreen",
  props: {
    index: {
      type: Number,
    },
  },
  data() {
    return {
      onboarding: [
        {
          title: "Send Money Globally with Web5",
          text: "Seamlessly transfer funds across the globe with the 5ive wallet",
          image:
            "https://lottie.host/embed/50317794-24bf-45b2-8909-3f8e426064e1/strbRZWGR8.json",
        },
        {
          title: "Fully Decentralized and Secure",
          text: "Enjoy total control of your funds—no middlemen, no exchanges, no KYC",
          image:
            "https://lottie.host/embed/a0f8d662-acc9-4ae4-88a5-a10316364694/GIpqKgt5fU.json",
        },
        {
          title: "Track your Activity, Learn Web5",
          text: "Monitor your transactions in real-time while mastering the power of Web5",
          image:
            "https://lottie.host/embed/a21d446b-2edb-4853-8c57-44a35576ffb5/iiJ4jNdwnL.json",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import "../../styles/onboarding.css";
</style>
