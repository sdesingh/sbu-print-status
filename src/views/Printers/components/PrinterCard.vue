<template>

  <v-card 
    outlined 
    class="printer-card" 
    
    :style="{border: `1px solid ${severityColor}`}
  ">

    <!-- Printer Name -->
    <v-card-text class="printer-card-title" :style="{background: severityColor, color: 'white' }"> 
      <h1 class="font-weight-bold"> {{ data.locationName }} </h1>
      <div class="pt-5"> {{ data.statusMessage }} </div>
    </v-card-text>

    <v-divider></v-divider>

    <!-- Tray Information -->
    <v-list dense>

      <v-list-item-group >
        <v-list-item
          v-for="tray in data.trays"
          :key="tray.name"
          @click=""
        >
          <v-list-item-title>{{ tray.name }}</v-list-item-title>

          <v-list-item-subtitle class="text-right">
            {{ tray.status }}
          </v-list-item-subtitle>

        </v-list-item>
      </v-list-item-group>

    </v-list>


  </v-card>
  
</template>

<script lang="ts">
import Vue from 'vue'
import Printer from '@/model/Printer/Printer';
import { GetSeverityColor } from '@/styles/Colors';

export default Vue.extend({
  props: {
    data: {
      required: true,
      type: Object as () => Printer
    }
  },
  methods: {

  },
  computed: {
    severityColor() {
      const printer: Printer = this.data;
      return GetSeverityColor(printer.checkPrinterStatus());
    }
  }
})
</script>


<style scoped>
  .printer-card-title {
    padding-top: 30px;
    font-size: 17px;
  }

  .printer-card {
    
  }
</style>