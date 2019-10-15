<template>
  <v-container fluid>

    <div style="display: block">
      <h2>Print Stats</h2>

      <v-btn class="mx-2" fab dark small color="primary" @click="fetch">
        <v-icon dark>mdi-cached</v-icon>
      </v-btn>

      <v-btn class="mx-2" fab dark small color="primary" @click="showSelect">
        <v-icon dark>mdi-view-grid-plus</v-icon>
      </v-btn>

      <v-btn class="mx-2" fab dark small color="primary" @click="showSettings">
        <v-icon dark>mdi-settings</v-icon>
      </v-btn>

    </div>

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
  components: {
    PrinterGrid,
    PrinterSelect,
    PrinterSettingsModal,
  },
  methods: {
    fetch(): void {
      this.$store.dispatch('data/fetchData')
    },
    showSelect(): void {
      this.showPrinterSelect = true;
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
    }
  },
  data() {
    return {
      showPrinterSelect: false,
    }
  },
  mounted() {
    
  },
})
</script>

<style scoped>



</style>