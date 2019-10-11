<template>

  <v-card class="printer-card" >

    <!-- Printer Name -->

    <v-card-text class="printer-card-title" :style="{background: severityColor, color: 'white' }"> 
      <h1 class="font-weight-bold"> {{ data.locationName }} </h1>
      <div class="pt-5 text-truncate"> {{ data.statusMessage }} </div>
    </v-card-text>

    <!-- Tray Information -->
    <v-list class="py-0">
        <v-list-item
          v-for="tray in data.trays"
          :key="tray.name"
          class="tray-list-item"
          :style="{background: tray.setting == 'Letter' ? '': '#FFE9E9'}"
          @click=""
        >

          <div class="text-left font-weight-bold">{{ tray.name }}</div>
          <div class="text-center">{{ tray.setting }}</div>

          <div class="text-right">
            <v-chip dark label small class="font-weight-bold px-2 body-2" :color="trayPaperStatusColor(tray.status)">
              {{ tray.status }}
            </v-chip>
          </div>


        </v-list-item>

        <!-- Added to pad out the trays. -->
        <div v-if="data.trays.length < 4">

          <v-list-item class="tray-list-item">

            <div class="text-center"> - </div>
            <div class="text-center"> - </div>

            <div class="text-center"> - </div>


          </v-list-item>

          <v-list-item class="tray-list-item">

            <div class="text-center font-weight-bold"> - </div>
            <div class="text-center"> - </div>

            <div class="text-center"> - </div>


          </v-list-item>

        </div>

    </v-list>

    <!-- Printer Supplies -->
    <div class="printer-card-supplies py-2">


      <v-tooltip top v-for="supply in data.supplies" :key="supply.type" color="black">
        <template  v-slot:activator="{ on }" >

          <div color="warning" class="printer-card-supply body-1 text-center" v-on="on">
            <v-icon left>{{ getSupplyIcon(supply.type) }}</v-icon>
            {{ supply.percentRemaining }}%
          </div>


        </template>

        <span> {{ supply.type }} </span>
      </v-tooltip>


    </div>


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
import { GetSeverityColor, Colors } from '@/styles/Colors';
import { Severity } from '@/model/Severity';
import { TrayStatus } from '@/model/Printer/Tray';
import { SupplyType } from '@/model/Printer/Supply';

export default Vue.extend({
  props: {
    data: {
      required: true,
      type: Object as () => Printer
    }
  },
  methods: {
    trayPaperStatusColor(status: TrayStatus) : string {
      switch(status) {
        case TrayStatus.FULL:     return Colors.success;
        case TrayStatus.LOW:      return Colors.warning;
        case TrayStatus.EMPTY:    return Colors.error;
        case TrayStatus.MISSING:  return Colors.unknown;
        default:                  return Colors.unknown;
      }
    },
    getSupplyIcon(supply: SupplyType): string {
      switch(supply) {
        case SupplyType.TONER: return 'mdi-water';
        case SupplyType.DRUM_KIT: return 'mdi-paper-roll';
        case SupplyType.MAINTENANCE_KIT: return 'mdi-tools';
        default: return 'mdi-help-box'
      }
    }
  },
  computed: {
    // Retrieve the color depending on Printer severity.
    severityColor() : string {
      const printer: Printer = this.data;
      return GetSeverityColor(printer.checkPrinterStatus());
    },
    // Status Icon depending on Printer severity.
    getStatusIcon() : string {
      const printer = this.data;
      switch(printer.checkPrinterStatus()) {
        case Severity.NORMAL: return 'mdi-check-circle';
        case Severity.WARNING: return 'mdi-alert';
        case Severity.URGENT: return 'mdi-close-circle';
        default: return 'mdi-help-circle';
      }
    },
    // 
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
    font-size: 16px;
  }

  .printer-card {
    user-select: none
  }

  .printer-card-supplies {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-template-rows: 30px;
  }

  .printer-card-supply {
    border-radius: 0px !important;
    color: ;
  }

  .tray-list-item {
    display: grid;
    font-family: 'Roboto Mono';
    grid-template-columns: 1fr 1fr 1fr;
  }

</style>