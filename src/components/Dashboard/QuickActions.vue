<template>
  <div>
    <h3>Quick actions</h3>

    <div class="quick-actions">
      <v-card class="rounded-xl px-6 cursor-pointer py-5" flat>
        <v-chip size="x-large" class="rounded-lg" label color="#d5e4ff"
          ><v-icon color="#2181fc"> mdi-chart-donut</v-icon></v-chip
        >
        <div class="my-4">
          <h3>Statistics</h3>
          <p class="description">
            View your most important insights on the 5ive wallet
          </p>
        </div>
      </v-card>
      <v-card to="/learn" class="rounded-xl px-6 cursor-pointer py-5" flat>
        <v-chip size="x-large" class="rounded-lg" label color="#eaf9f0"
          ><v-icon color="#5fd293"> mdi-play-circle-outline </v-icon></v-chip
        >
        <div class="my-4">
          <h3>Learn Web5</h3>
          <p class="description">
            Discover how Web5 powers your decentralized wallet
          </p>
        </div>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.quick-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 6px 0px;
}

.description {
  font-size: 12px;
}
</style>
