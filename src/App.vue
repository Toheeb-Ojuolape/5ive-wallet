<template>
  <Layout>
    <router-view />
    <BottomMenu v-if="$route.path != '/'" />
  </Layout>
</template>

<script setup>
import Layout from "@/layouts/default.vue";
import BottomMenu from "./components/BottomMenu.vue";
</script>

<style>
@import "./styles/animations.css";
@import "./styles/settings.css";
</style>
