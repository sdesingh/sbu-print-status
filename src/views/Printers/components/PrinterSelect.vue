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
      <h2>Printer Select</h2>
    </v-sheet>

    <v-card-text>
      <v-treeview
        v-model="selected"
        :items="items"
        :search="search"
        :filter="filter"
        :open.sync="open"
        color="primary"
        selection-type="leaf"
        open-on-click
        selectable
        hoverable
      >
        <template v-slot:prepend="{ item }">
          <v-icon
            v-if="item.children"
            v-text="`mdi-${item.id < 5 ? 'home-variant' : 'folder-network'}`"
          ></v-icon>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data: () => ({
      selected: [201, 202],
      items: [
        {
          id: 1,
          name: 'Campus Residences',
          children: [
            {
              id: 120,
              name: 'Print From Anywhere',
              children: [
                {
                  id: 201,
                  name: 'Irving',
                },
                {
                  id: 202,
                  name: 'GLS',
                },
                {
                  id: 203,
                  name: 'West Commons',
                },
                {
                  id: 204,
                  name: 'Roth SSO',
                },
              ],
            },
            {
              id: 130,
              name: 'RCC Labs',
              children: [
                {
                  id: 301,
                  name: 'Chavez RCC',
                },
                {
                  id: 302,
                  name: 'Tubman RCC',
                },
                {
                  id: 303,
                  name: 'O\'Neill RCC',
                },
                {
                  id: 304,
                  name: 'Cardozo RCC',
                },
                {
                  id: 305,
                  name: 'Douglass RCC',
                },
                {
                  id: 306,
                  name: 'Benedict RCC',
                },                                
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'SINC Sites',
          children: [
            {
              id: 210,
              name: 'Melville Library',
              children: [
              ]
            },
          ]
        },

      ],
      open: [1, 2],
      search: '',
      caseSensitive: false,
    }),
  computed: {
    filter () {
      return this.caseSensitive
        ? (item: any, search: any, textKey: any) => item[textKey].indexOf(search) > -1
        : undefined
    },
  },

  
})
</script>