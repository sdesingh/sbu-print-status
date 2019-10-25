<template>
  <v-app id="inspire">
    <nav-drawer />
    <app-bar />

    <v-btn id="stat-card" color="success">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-content id="content">
      <v-scroll-y-transition mode="out-in">
        <router-view id="view" />
      </v-scroll-y-transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import StatCard from "@/components/Stats/StatCard.vue";
import NavDrawer from "./components/Navigation/NavDrawer.vue";
import AppBar from "./components/Navigation/AppBar.vue";
import { Colors } from "@/styles/Colors";

export default Vue.extend({
  props: {
    source: String
  },
  components: {
    NavDrawer,
    AppBar,
    StatCard
  },
  data: () => ({
    drawer: null
  }),
  mounted() {
    this.$store.dispatch("data/init");
    this.$store.commit("ui/init");
    this.$vuetify.theme.dark = this.$store.state.ui.enableDarkMode;
  }
});
</script>

<style>
@import url("./styles/global.css");
#stat-card {
  display: inline-flex;
  bottom: 20px;
  right: 20px;
  position: absolute;
  z-index: 100000;
}

#content {
  height: 100vh;
  overflow-y: auto;
}
</style>