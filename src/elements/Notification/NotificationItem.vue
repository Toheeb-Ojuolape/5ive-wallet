<template>
  <v-card flat class="rounded-xl d-flex pa-6 mb-3">
    <div>
      <v-icon>mdi-bell-ring-outline</v-icon>
    </div>

    <div class="ml-6">
      <h3>{{ title }}</h3>
      <div class="description">{{ description }}</div>
      <div class="time">{{ time }}</div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "NotificationItem",
  props: {
    title: {
      type: String,
    },

    description: {
      type: String,
    },

    time: {
      type: String,
    },
  },
};
</script>

<style scoped>
.description {
  font-size: 13px;
}
.time {
  font-size: 9px;
  margin: 5px 0px
}
</style>
