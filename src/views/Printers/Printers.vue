<template>
  <v-container fluid :fill-height="printerData.length == 0">
    <v-dialog v-model="showPrinterSelect" max-width="500px">
      <printer-select />
    </v-dialog>

    <v-dialog v-model="showPrinterSettings" max-width="500px">
      <printer-settings-modal />
    </v-dialog>

    <!-- <v-scroll-x-transition mode="out-in"> -->
    <printer-grid v-if="printerData.length != 0" :data="printerData" :isLoading="isLoadingData" />
    <!-- </v-scroll-x-transition> -->

    <v-scroll-x-transition mode="out-in">
      <v-container class="mx-auto" v-if="printerData.length == 0">
        <h3 class="py-5">No printers selected. Please select printers to track them.</h3>
        <v-btn large color="primary" @click="showSelect">
          <v-icon left>mdi-view-grid-plus</v-icon>Select Printers
        </v-btn>
      </v-container>
    </v-scroll-x-transition>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import PrinterGrid from "./components/PrinterGrid.vue";
import PrinterSelect from "./components/PrinterSelect.vue";
import PrinterSettingsModal from "./components/PrinterSettingsModal.vue";
import Printer from "@/model/Printers/Printer";
import { mutate as ui, mutate } from "@/store/ui/mutations";

export default Vue.extend({
  mounted() {
    this.$store.dispatch("data/fetchData");
  },
  components: {
    PrinterGrid,
    PrinterSelect,
    PrinterSettingsModal
  },
  methods: {
    fetch(): void {
      this.$store.dispatch("data/fetchData");
    },
    showSettings(): void {
      this.$store.commit("ui/" + mutate.SHOW_SETTINGS, true);
    },
    showSelect(): void {
      this.$store.commit("ui/" + mutate.SHOW_PRINTER_SELECT, true);
    }
  },
  computed: {
    printerData(): Printer[] {
      const map: { [key: number]: Printer } = this.$store.state.data.printers;
      const toRetrieve = this.$store.state.data.toRetrieve;

      const printers: Printer[] = [];
      toRetrieve.forEach((id: number, index: number) => {
        if (map[id]) {
          printers.push(map[id]);
        }
      });

      return printers;
    },
    isLoadingData(): boolean {
      return this.$store.state.data.isLoadingData;
    },
    showPrinterSettings: {
      get() {
        return this.$store.state.ui.showPrinterSettings;
      },
      set(value) {
        this.$store.commit("ui/" + mutate.SHOW_SETTINGS, value);
      }
    },
    showPrinterSelect: {
      get() {
        return this.$store.state.ui.showPrinterSelect;
      },
      set(value) {
        this.$store.commit("ui/" + mutate.SHOW_PRINTER_SELECT, value);
      }
    }
  }
});
</script>

<style scoped>
</style>