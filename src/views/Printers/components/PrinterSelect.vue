<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <!-- <v-sheet class="pa-4 primary">
      <v-text-field
        v-model="search"
        label="Search Printers"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
      <v-checkbox
        v-model="caseSensitive"
        dark
        color="white"
        hide-details
        label="Case sensitive search"
      ></v-checkbox>
    </v-sheet> -->

    <v-sheet class="pa-4 primary" dark>
      <h2>Select Printers</h2>
    </v-sheet>

    <v-card-text>
      <v-treeview
        v-model="selected"
        :items="groups"
        color="primary"
        selection-type="leaf"
        open-on-click
        selectable
        hoverable
      >

        <template v-slot:prepend="{ item }">
          <v-icon
            v-if="item.subGroups"
            v-text="`mdi-${item.subGroups ? 'home-variant' : 'folder-network'}`"
          />
        </template>

      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Group from '@/model/Locations/Group'

export default Vue.extend({
  data: () => ({
      search: '',
      caseSensitive: false,
    }),
  computed: {
    filter () {
      return this.caseSensitive
        ? (item: any, search: any, textKey: any) => item[textKey].indexOf(search) > -1
        : undefined
    },
    selected: {
      get(): number[] {
        return this.$store.state.data.toRetrieve;
      },
      set(value): void {
        this.$store.commit('data/toRetrieve', value);
        this.$store.commit('data/resetPrinterData');
        this.$store.dispatch('data/fetchData');
      }
    },
    groups(): any[] {
      const groups: any[] = this.$store.state.data.groups;
      return groups.map(
        g => {
          return {
            id: g.name,
            name: g.name,
            children: g.children
          }
        }
      )
    }
  },

  
})
</script>