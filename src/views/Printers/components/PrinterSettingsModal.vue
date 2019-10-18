<template>
  <v-card class="mx-auto" max-width="500">

    <v-sheet class="pa-4 primary" dark>
      <h2>App Settings</h2>
    </v-sheet>

    <v-card-text>
      
      <v-list two-line subheader>
        <v-subheader>General</v-subheader>

        <v-list-item @click="" disabled>
          <v-list-item-content>
            <v-list-item-title>Thresholds (Disabled)</v-list-item-title>
            <v-list-item-subtitle>Set specific supply thresholds.</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="toggleDarkMode">


            <v-list-item-content>
              <v-list-item-title>Enable Dark Mode</v-list-item-title>
              <v-list-item-subtitle>Spooky! 👻</v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>
    </v-list>



    </v-card-text>

    
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    toggleDarkMode() {
      this.$store.commit('ui/setDarkMode', !this.$vuetify.theme.dark)
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
  computed: {
    isDarkModeEnabled: {
      get() {

      },
      set(val): void {

      }
    }
  }
})
</script>