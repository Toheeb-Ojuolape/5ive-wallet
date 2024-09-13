<template>
  <iframe
    width="352"
    height="198"
    :src="video"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</template>

<script>
export default {
  props: {
    video: {
      type: String,
    },
  },
};
</script>
