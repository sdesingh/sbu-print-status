<template>
  <v-card class="printer-card">
    <!-- Printer Name -->

    <v-card-text class="printer-card-title" :class="severityThemeColor">
      <h1 class="font-weight-bold white--text">{{ data.locationName }}</h1>
      <div class="pt-5 text-truncate white--text">{{ data.statusMessage }}</div>
      <v-icon
        :color="isDarkModeEnabled ? severityColor : 'white'"
        style="position: absolute; right: 15px; top: 20px; font-size: 30px;"
      >{{ getStatusIcon }}</v-icon>
    </v-card-text>

    <!-- Tray Information -->
    <v-list class="py-0">
      <v-list-item v-for="tray in data.trays" :key="tray.name" class="tray-list-item" @click>
        <div class="text-left font-weight-bold">{{ tray.name }}</div>
        <div class="text-center">{{ tray.setting }}</div>

        <div class="text-right">
          <v-chip
            dark
            label
            small
            class="font-weight-bold px-2 body-2"
            :color="trayPaperStatusColor(tray.status)"
          >{{ tray.status }}</v-chip>
        </div>
      </v-list-item>

      <!-- Added to pad out the trays. -->
      <div v-if="data.trays.length < 4">
        <v-list-item class="tray-list-item" v-for="i in (4 - data.trays.length)" :key="i+'l'">
          <div class="text-center">-</div>
          <div class="text-center">-</div>

          <div class="text-center">-</div>
        </v-list-item>
      </div>
    </v-list>

    <!-- Printer Supplies -->
    <div class="printer-card-supplies my-2">
      <v-tooltip top v-for="supply in data.supplies" :key="supply.type" color="black">
        <template v-slot:activator="{ on }">
          <v-btn
            outlined
            class="printer-card-supply body-1 text-center mx-3"
            :color="getSupplyColor(supply)"
            v-on="on"
          >
            <v-icon left>{{ getSupplyIcon(supply.type) }}</v-icon>
            {{ supply.percentRemaining }}%
          </v-btn>
        </template>

        <span>{{ supply.type }}</span>
      </v-tooltip>

      <h4 class="text-center" v-if="data.supplies.length === 0">No supplies.</h4>
    </div>

    <!-- Card Footer -->
    <v-sheet class="printer-card-footer py-2 px-4 white--text" :class="severityThemeColor">
      <!-- Printer Status Icon -->
      <!-- <v-icon :color="severityColor">{{ getStatusIcon }}</v-icon> -->

      <span class="font-weight-regular">{{ printerSubMessage }}</span>

      <a target="_blank" :href="data.webServerURL">
        <v-icon color="white" style="position: absolute; right: 15px;">mdi-link</v-icon>
      </a>
    </v-sheet>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Printer from "@/model/Printers/Printer";
import Supply from "@/model/Printers/Supply";
import { GetSeverityClass, GetSeverityColor, Colors } from "@/styles/Colors";
import { Severity } from "@/model/Severity";
import { TrayStatus } from "@/model/Printers/Tray";
import { SupplyType } from "@/model/Printers/Supply";

export default Vue.extend({
  props: {
    data: {
      required: true,
      type: Object as () => Printer
    }
  },
  methods: {
    trayPaperStatusColor(status: TrayStatus): string {
      switch (status) {
        case TrayStatus.FULL:
          return "success";
        case TrayStatus.LOW:
          return "warning";
        case TrayStatus.EMPTY:
          return "error";
        case TrayStatus.MISSING:
          return "info";
        default:
          return "info";
      }
    },
    getSupplyColor(supply: Supply): string {
      if (supply.needsReplacement()) return "error";
      else if (supply.isBelowThreshold()) return "warning";
      else return "success";
    },
    getSupplyIcon(supply: SupplyType): string {
      switch (supply) {
        case SupplyType.TONER:
          return "mdi-water";
        case SupplyType.DRUM_KIT:
          return "mdi-paper-roll";
        case SupplyType.MAINTENANCE_KIT:
          return "mdi-tools";
        default:
          return "mdi-help-box";
      }
    }
  },
  computed: {
    // Retrieve the color depending on Printer severity.
    severityThemeColor(): string {
      const printer: Printer = this.data;
      let severity = printer.checkPrinterStatus();
      if (this.isDarkModeEnabled) {
        // if (severity == Severity.URGENT) {
        //   return "error";
        // } else {
        return "primary";
        // }
      } else return GetSeverityClass(severity);
    },
    severityColor(): string {
      let severity = this.data.checkPrinterStatus();
      return GetSeverityClass(severity);
    },
    // Status Icon depending on Printer severity.
    getStatusIcon(): string {
      const printer = this.data;
      switch (printer.checkPrinterStatus()) {
        case Severity.NORMAL:
          return "mdi-check-circle";
        case Severity.WARNING:
          return "mdi-alert";
        case Severity.URGENT:
          return "mdi-close-circle";
        default:
          return "mdi-help-circle";
      }
    },
    isDarkModeEnabled(): boolean {
      return this.$store.state.ui.enableDarkMode;
    },
    //
    printerSubMessage(): string {
      const printer = this.data;
      if (this.data.checkPrinterStatus() == Severity.UNKNOWN) {
        return "Cannot reach the printer.";
      } else {
        return (
          "Pages Printed: " +
          printer.pageCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
      }
    }
  }
});
</script>


<style scoped>
.printer-card-title {
  padding-top: 30px;
  font-size: 16px;
}

.printer-card {
  user-select: none;
}

.printer-card-supplies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  line-height: 40px;
  grid-template-rows: 40px;
}

.printer-card-supply {
  border-radius: 0px !important;
}

.tray-list-item {
  display: grid;
  font-family: "Roboto Mono";
  grid-template-columns: 1fr 1fr 1fr;
}
</style>