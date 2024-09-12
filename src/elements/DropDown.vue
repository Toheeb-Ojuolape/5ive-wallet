<template>
  <v-menu transition="scale-transition">
    <template v-slot:activator="{ props }">
      <v-btn variant="outlined" rounded="pill" v-bind="props">
        {{ type }}{{': ' + selected }}
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        @click="selectedItem(item)"
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-item-title>{{ item }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
    data:()=>({
        selected: ""
    }),
  props: {
    items: {
      type: Array,
    },
    type:{
        type: String
    }
  },

  methods:{
    selectedItem(item){
        this.selected = item
    }
  }
};
</script>
