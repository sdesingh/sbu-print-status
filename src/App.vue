<template>
  <v-app id="inspire">
    <nav-drawer />
    <app-bar />

    <v-content>
      <v-scroll-y-transition mode="out-in">
        <router-view />
      </v-scroll-y-transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import NavDrawer from "./components/Navigation/NavDrawer.vue";
import AppBar from "./components/Navigation/AppBar.vue";
import { Colors } from "@/styles/Colors";

export default Vue.extend({
  props: {
    source: String
  },
  components: {
    NavDrawer,
    AppBar
  },
  data: () => ({
    drawer: null
  }),
  mounted() {
    // this.$vuetify.theme.themes.light.primary = '#e67e22'
    // this.$vuetify.theme.themes.dark.primary = "#3c40c6";
    // for (let key in Object.keys(Colors["light"])) {
    //   let color = Colors.light[key];
    //   this.$vuetify.theme.themes.light[key] = color;
    // }

    // for (let key in Object.keys(Colors.dark)) {
    //   let color = Colors.dark[key];
    //   console.log(color);
    //   this.$vuetify.theme.themes.dark[key] = color;
    // }

    // console.log(this.$vuetify.theme.themes.dark);

    this.$store.dispatch("data/init");
    this.$store.commit("ui/init");
    this.$vuetify.theme.dark = this.$store.state.ui.enableDarkMode;
  }
});
</script>

<style>
@import url("./styles/global.css");
</style>