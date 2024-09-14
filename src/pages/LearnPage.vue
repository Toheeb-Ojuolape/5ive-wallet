<template>
  <div class="learn-container">
    <h3>Learn</h3>

    <v-card flat class="rounded-lg px-6 pb-6 my-3">
      <div class="d-flex overflow-x-auto py-5">
        <div class="mr-5" v-for="(video, i) in learn.videos" :key="i">
          <VideoContainer :video="video" />
        </div>
      </div>
    </v-card>

    <v-card flat class="rounded-lg px-6  my-3">
      <div class="py-5">
        <h4>Quick reads</h4>
        <div class="d-flex overflow-x-auto">
          <div class="py-3" v-for="(article, i) in learn.articles" :key="i">
            <ArticleContainer :article="article" />
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import ArticleContainer from "@/components/Learn/ArticleContainer.vue";
import VideoContainer from "@/components/Learn/VideoContainer.vue";
import learn from "@/data/learn.json";
export default {
  components: { ArticleContainer, VideoContainer },
  data: () => ({
    learn,
  }),
};
</script>

<style scoped>
.learn-container {
  margin: 20px 0px;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  padding: 0px 20px;
}
</style>
