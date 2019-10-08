<template>
  <v-app-bar
    app
    clipped-left
    color="primary"
    dark
    dense
  >
    <v-app-bar-nav-icon @click.stop="toggleNavDrawer"></v-app-bar-nav-icon>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    toggleNavDrawer(): void {
      this.$store.commit('ui/toggleNavDrawer');
    }
  }
})
</script>