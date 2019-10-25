<template>
  <v-card class="mx-auto" max-width="500">
    <v-sheet class="pa-4 primary" dark>
      <h2>{{ menuTitle }}</h2>
    </v-sheet>

    <v-tabs fixed-tabs background-color="primary" dark>
      <v-tab @click="currentMenu = 'select'">Select</v-tab>
      <v-tab @click="currentMenu = 'sort'">Organize</v-tab>
    </v-tabs>

    <v-card-text>
      <v-treeview
        v-if="currentMenu == 'select'"
        v-model="selected"
        :items="groups"
        color="primary"
        selection-type="leaf"
        selected-color="success"
        open-on-click
        selectable
        hoverable
      ></v-treeview>
    </v-card-text>

    <v-list dense v-if="currentMenu == 'sort'">
      <draggable v-model="selected" group="people" @start="drag=true" @end="drag=false">
        <v-list-item v-for="(item, i) in selected" :key="i" @click>{{ printerMeta[item].name }}</v-list-item>
      </draggable>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Group from "@/model/Locations/Group";
import { getGroupMeta } from "@/util/api";
import { action } from "@/store/data/actions";
import { mutate } from "@/store/data/mutations";
var draggable = require("vuedraggable");

const Menu = {
  SELECT: "select",
  SORT: "sort"
};

export default Vue.extend({
  components: {
    draggable
  },
  mounted() {
    // this.getGroupData();
  },
  data() {
    return {
      currentMenu: Menu.SELECT,
      loading: true
    };
  },
  methods: {},
  computed: {
    selected: {
      get(): number[] {
        return this.$store.state.data.toRetrieve;
      },
      set(value): void {
        this.$store.commit("data/" + mutate.PRINTERS_TO_RETRIEVE, value);
        this.$store.commit("data/" + mutate.RESET_PRINTER_DATA);
        this.$store.dispatch("data/" + action.FETCH_DATA);
      }
    },
    menuTitle() {
      if (this.currentMenu == Menu.SELECT) {
        return "Select Printers";
      } else {
        return "Organize Printers";
      }
    },
    groups(): any[] {
      const groups: any[] = this.$store.state.data.groups;
      return groups.map(g => {
        return {
          id: g.name,
          name: g.name,
          children: g.children
        };
      });
    },
    printerMeta() {
      return this.$store.state.data.printerMeta;
    }
  }
});
</script>