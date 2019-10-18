<template>

  <v-navigation-drawer
    v-model="show"
    id="drawer"
    app
    elevation="10"
    temporary
  >

  <!-- Header for Nav Drawer. -->
  <template v-slot:prepend>
    <v-img src="../../assets/sbu_logo.png" width="100" class="mx-auto my-5" alt=""/>
    <!-- <h3 class="text-center pa-5">Stony Brook University</h3> -->
  </template>

  <!-- List Items -->
  <v-list class="mx-5" rounded>

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



  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      routes: [
        {
          name: 'Printers',
          to: '/',
          icon: 'mdi-printer'
        },
        // {
        //   name: 'Printers',
        //   to: '/printers',
        //   icon: 'mdi-printer'
        // },
        {
          name: 'Logs',
          to: '/logs',
          icon: 'mdi-database-search'
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