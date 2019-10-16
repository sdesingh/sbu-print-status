<template>
  <v-container fluid>

    <v-dialog v-model="showPrinterSelect" max-width="500px">
      <printer-select/>
    </v-dialog>

    <v-dialog v-model="showPrinterSettings" max-width="500px">
      <printer-settings-modal/>
    </v-dialog>

    <printer-grid :data="printerData" :isLoading="isLoadingData"/>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PrinterGrid from './components/PrinterGrid.vue';
import PrinterSelect from './components/PrinterSelect.vue';
import PrinterSettingsModal from './components/PrinterSettingsModal.vue';
import Printer from '@/model/Printers/Printer';

export default Vue.extend({
  mounted() {
    this.$store.dispatch('data/fetchData')
  },
  components: {
    PrinterGrid,
    PrinterSelect,
    PrinterSettingsModal,
  },
  methods: {
    fetch(): void {
      this.$store.dispatch('data/fetchData')
    },
    showSettings(): void {
      this.$store.commit('ui/showPrinterSettings', true);
    }
  },
  computed: {
    printerData(): Printer[] {
      const map: {[key: number]: Printer} = this.$store.state.data.printers;
      const printers: Printer[] = Object.values(map)
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
        this.$store.commit('ui/showPrinterSettings', value);
      }
    },
    showPrinterSelect: {
      get() {
        return this.$store.state.ui.showPrinterSelect;
      },
      set(value) {
        this.$store.commit('ui/showPrinterSelect');
      }
    }
  },
})
</script>

<style scoped>



</style>