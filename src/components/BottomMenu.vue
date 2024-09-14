<template>
  <v-bottom-navigation absolute grow :elevation="2" fixed rounded="large" class="bottom-navigation">
    <v-btn to="/home">
      <v-icon icon="mdi-security"></v-icon>
      <span>Home</span>
    </v-btn>

    <v-btn to="/swap">
      <v-icon>mdi-sync</v-icon>

      <span>Swap</span>
    </v-btn>

    <v-btn to="/send">
      <v-icon>mdi-trending-up</v-icon>

      <span>Send</span>
    </v-btn>

    <v-btn to="/history">
      <v-icon>mdi-swap-vertical</v-icon>

      <span>Activity</span>
    </v-btn>

    <v-btn to="/profile">
      <v-icon>mdi-account-circle-outline</v-icon>

      <span>Profile</span>
    </v-btn>
  </v-bottom-navigation>
</template>



<style scoped>
.bottom-navigation{
  border-radius: 12px 12px 0px 0px
}
</style>