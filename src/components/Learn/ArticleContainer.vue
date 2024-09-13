<template>
  <div @click="goToUrl(article.url)" class="article-container">
    <v-img width="200px" :src="article.image" />
    <h3 class="article-title">{{ article.title }}</h3>
    <div class="article-meta">By {{ article.author }}</div>
    <div class="article-date">{{ article.date }} • {{ article.time }}</div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
    },
  },

  methods: {
    goToUrl(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
.article-container {
  border-radius: 10px;
  border: 1px solid #dde2e9;
  margin: 0px 6px;
  padding: 12px;
  height: 250px;
  position: relative;
  cursor: pointer;
}

.article-title {
  font-size: 14px;
  position: absolute;
  top: 10;
  margin: 8px 0px 0px 0px;
}

.article-meta {
  font-size: 12px;
  position: absolute;
  top: 10;
  margin: 55px 0px 0px 0px;
}

.article-date {
  font-size: 11px;
  position: absolute;
  bottom: 0;
  margin: 0px 0px 12px 0px;
  color: #383b43;
}
</style>
