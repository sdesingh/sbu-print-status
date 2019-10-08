<template>

  <v-navigation-drawer
    v-model="show"
    id="drawer"
    app
    clipped
  >

  <!-- Header for Nav Drawer. -->
  <template v-slot:prepend>
    <h3 class="text-center pa-5">Stony Brook University</h3>
  </template>

  <!-- List Items -->
  <v-list class="mx-5">

    <v-list-item
      v-for="route in routes"
      :key="route.name"
      :to="route.to"
    >
      <v-list-item-action>
        <v-icon>{{ route.icon }}</v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title>{{ route.name }}</v-list-item-title>
      </v-list-item-content>

    </v-list-item>

  </v-list>


  <!-- Footer for Nav Drawer -->
  <template v-slot:append>
    <div class="pa-2">
      <v-btn block>Logout</v-btn>
    </div>
  </template>


  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      routes: [
        {
          name: 'Home',
          to: '/',
          icon: 'mdi-home'
        },
        {
          name: 'Printers',
          to: '/printers',
          icon: 'mdi-printer'
        },
        {
          name: 'About',
          to: '/about',
          icon: 'mdi-information'
        }
      ],
    }
  },
  computed: {
    show: {
      get: function(): boolean {
        return this.$store.state.ui.showNavDrawer
      },
      set: function(newState): void {
        this.$store.commit('ui/setNavDrawer', newState);
      }
    }
  }
})
</script>

<style scoped>
  #drawer {
    border: none;
  }
</style>