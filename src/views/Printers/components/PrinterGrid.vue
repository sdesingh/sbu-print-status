<template>
  <div id="printer-grid" class="my-3">
      <printer-card class="printer-card" :data="printer" v-for="(printer, i) in data" :key="i"/>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Printer from '@/model/Printers/Printer';
import PrinterCard from './PrinterCard.vue';

export default Vue.extend({
  props: {
    data: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    }
  },
  components: {
    PrinterCard,
  }
})
</script>


<style scoped>

  #printer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: 15px;
  }

  .printer-card {
    /* background: coral; */
  }

</style>