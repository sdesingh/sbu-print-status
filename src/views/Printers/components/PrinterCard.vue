<template>

  <v-card 
     
    class="printer-card" 
    

  >

    <!-- Printer Name -->

    <v-card-text class="printer-card-title" :style="{background: severityColor, color: 'white' }"> 
      <h1 class="font-weight-bold"> {{ data.locationName }} </h1>
      <div class="pt-5 text-truncate"> {{ data.statusMessage }} </div>
    </v-card-text>

    <!-- Tray Information -->
    <v-list dense class="py-0">

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

    <!-- Card Footer -->
    <div class="printer-card-footer py-2 px-4" :style="{background: severityColor, color: 'white' }">

      <!-- Printer Status Icon -->
      <v-icon color="white">{{ getStatusIcon }}</v-icon>

      <span class="ml-2 font-weight-regular"> {{ printerSubMessage }} </span>

      <router-link to="/about">
        
        <v-icon color="white" style="position: absolute; right: 15px;">mdi-link</v-icon>

      </router-link>
      
    </div>

  </v-card>
  
</template>

<script lang="ts">
import Vue from 'vue'
import Printer from '@/model/Printer/Printer';
import { GetSeverityColor } from '@/styles/Colors';
import { Severity } from '@/model/Severity';

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
    severityColor() : string {
      const printer: Printer = this.data;
      return GetSeverityColor(printer.checkPrinterStatus());
    },
    getStatusIcon() : string {
      const printer = this.data;
      switch(printer.checkPrinterStatus()) {
        case Severity.NORMAL: return 'mdi-check-circle';
        case Severity.WARNING: return 'mdi-alert';
        case Severity.URGENT: return 'mdi-close-circle';
        default: return 'mdi-help-circle';
      }
    },
    printerSubMessage() : string {
      const printer = this.data;
      if(this.data.checkPrinterStatus() == Severity.UNKNOWN){
        return 'Cannot reach the printer.';
      }else{
        return 'Pages Printed: ' + printer.pageCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
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