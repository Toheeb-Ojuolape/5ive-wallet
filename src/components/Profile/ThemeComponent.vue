<template>
  <v-card flat class="px-4 py-2 my-4 rounded-lg" height="160px">
    <h4>Theme</h4>
    <div class="d-flex justify-space-between">
      <div class="mt-4">{{ theme === "dark" ? "Dark" : "Light" }} Mode</div>
      <v-switch
        @change="handleChangeTheme"
        inset
        :model-value="theme === 'dark'"
        color="#ffbf02"
      ></v-switch>
    </div>

    <div class="d-flex justify-space-between">
      <div>Theme Color</div>
      <v-menu :close-on-content-click="false" v-model="menuBtn" location="top" offset-y offset-x>
        <template v-slot:activator="{ props }">
          <div :style="btnStyle" v-bind="props"></div>
        </template>
        <v-card>
          <v-card-text class="pa-0">
            <v-color-picker @update:modelValue="setThemeColor" flat />
          </v-card-text>
        </v-card>
      </v-menu>
    </div>
  </v-card>
</template>

<script>
import { useUserStore } from "@/stores/user.store";
import { mapState } from "pinia";
export default {
  data() {
    return {
      theme: localStorage.getItem("theme"),
      mask: "!#XXXXXXXX",
      menuBtn: false,
    };
  },

  setup() {
    const userStore = useUserStore();
    return { userStore };
  },

  computed: {
    ...mapState(useUserStore, {
      themecolor: "themecolor",
    }),
    btnStyle() {
      const {  menuBtn } = this;
      return {
        backgroundColor: this.themecolor,
        cursor: "pointer",
        height: "30px",
        width: "30px",
        borderRadius: menuBtn ? "50%" : "4px",
        transition: "border-radius 200ms ease-in-out",
      };
    },
  },
  methods: {
    setThemeColor(color){
      this.userStore.setThemeColor(color)
    },

    handleChangeTheme() {
      if (!this.theme) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", this.theme === "dark" ? "light" : "dark");
      }
      location.reload();
    },
  },
};
</script>
