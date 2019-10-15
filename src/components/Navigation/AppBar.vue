<template>
  <v-app-bar
    app
    clipped-left
    color="primary"
    dark
    dense
  >
    <v-app-bar-nav-icon @click.stop="toggleNavDrawer"></v-app-bar-nav-icon>

    <div class="flex-grow-1"></div>

    <v-scroll-x-transition mode="out-in">
      <div :is="currentModule"/>
    </v-scroll-x-transition>
    
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import PrinterAppBar from './AppBarModules/PrinterAppBar.vue';
export default Vue.extend({
  components: {
    'printers': PrinterAppBar,
  },
  methods: {
    toggleNavDrawer(): void {
      this.$store.commit('ui/toggleNavDrawer');
    }
  },
  computed: {
    currentModule(): string {
      switch(this.$route.name) {
        case 'printers': return 'printers';
        default: return '';
      }
    }
  }
})
</script>