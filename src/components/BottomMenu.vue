<template>
  <v-bottom-navigation :elevation="2" fixed grow rounded="large">
    <v-btn to="/">
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>

    <v-btn to="/exchange">
      <v-icon>mdi-reload</v-icon>

      <span>Swap</span>
    </v-btn>

    <v-btn to="/chat">
      <v-icon>mdi-send</v-icon>

      <span>Send</span>
    </v-btn>

    <v-btn value="favorites">
      <v-icon>mdi-bank-outline</v-icon>

      <span>History</span>
    </v-btn>

    <v-btn value="nearby">
      <v-icon>mdi-account-circle-outline</v-icon>

      <span>Profile</span>
    </v-btn>
  </v-bottom-navigation>
</template>
