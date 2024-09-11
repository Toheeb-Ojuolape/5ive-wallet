<template>
  <div>
    <h5>Choose Avatar</h5>

    <div class="avatars">
      <div
        @click="setUserImage(image)"
        class="cursor-pointer"
        v-for="(image, i) in avatars"
        :key="i"
      >
        <v-avatar :size="70">
          <v-img :size="70" :src="image" />
        </v-avatar>
      </div>
    </div>
  </div>
</template>

<script>
import avatar1 from "@/assets/avatars/avatar1.svg";
import avatar2 from "@/assets/avatars/avatar2.svg";
import avatar3 from "@/assets/avatars/avatar3.svg";
import avatar4 from "@/assets/avatars/avatar4.svg";
import avatar5 from "@/assets/avatars/avatar5.svg";
import avatar6 from "@/assets/avatars/avatar6.svg";
import avatar7 from "@/assets/avatars/avatar7.svg";
import avatar8 from "@/assets/avatars/avatar8.svg";
import avatar9 from "@/assets/avatars/avatar9.svg";
import avatar10 from "@/assets/avatars/avatar10.svg";
import avatar11 from "@/assets/avatars/avatar11.svg";
import avatar12 from "@/assets/avatars/avatar12.svg";
import { useUserStore } from "@/stores/user.store";
import { storeToRefs } from "pinia";

export default {
  data() {
    return {
      avatars: [
        avatar1,
        avatar2,
        avatar3,
        avatar4,
        avatar5,
        avatar6,
        avatar7,
        avatar8,
        avatar9,
        avatar10,
        avatar11,
        avatar12,
      ],
    };
  },

  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },

  methods: {
    setUserImage(image) {
      this.userStore.setUser({
        image: image,
      });
    },
  },
};
</script>

<style lang="css" scoped>
.avatars {
  display: flex;
  overflow-x: auto;
  padding: 9px 0px 15px 0px;
}
.avatars > div {
  margin: 0px 0px 0px 10px;
}
</style>
