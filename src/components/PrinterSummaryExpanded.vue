<template>
  <div>
    <!-- Supply Information (Row 1) -->
    <div id="supply-information" class="mx-5 my-3" v-if="!printerData.isOffline()">
      <div id="summary" class="my-auto">
        <!-- Display the name of the Printer Location. -->
        <span id="titlebar">{{ printerData.name }}</span>
        <!-- Status Icon Blinking if Printer is Online -->
        <span
          class="spinner-grow mb-1"
          :class="'text-' + statusStyles[printerStatusCode]"
          role="status"
          v-if="!printerData.isOffline()"
        ></span>
        <div class="my-auto">{{ printerData.statusMessage }}</div>
      </div>

      <div
        class="card text-white text-center supply-card"
        :class="'bg-' + statusStyles[printerData.tonerStatusCode(supplyThresholds[0].value)]"
      >
        <div class="card-header">Toner</div>
        <div class="card-body">
          <h2 style="font-weight: 600;">{{ printerData.tonerStatus }}%</h2>
        </div>
      </div>

      <div
        class="card text-white text-center supply-card"
        :class="'bg-' + statusStyles[printerData.drumStatusCode(supplyThresholds[1].value)]"
      >
        <div class="card-header">Drum Kit</div>
        <div class="card-body">
          <h2 style="font-weight: 600;">{{ printerData.drumStatus }}%</h2>
        </div>
      </div>

      <div
        class="card text-white text-center supply-card"
        :class="'bg-' + statusStyles[printerData.maintKitStatusCode(supplyThresholds[2].value)]"
      >
        <div class="card-header">Maintenance Kit</div>
        <div class="card-body">
          <h2 style="font-weight: 600;">{{ printerData.maintKitStatus }}%</h2>
        </div>
      </div>
    </div>

    <!-- <div id="graph" class="mx-5 my-4"> -->

    <!-- Chart Showing Pages Printed -->
    <!-- <line-graph :height="90" :chartData="graphData" :options="graphOptions"  class="my-5" v-if="!printerData.isOffline()"/> -->

    <!-- </div> -->

    <hr class="mx-5 mt-4">
    <printer-query-browser id="query-browser" class="mx-5 mt-4"/>
  </div>
</template>


<script>
import LineGraph from "../components/Graphs/LineGraph";
import GraphTemplates from "../components/Graphs/Templates";
import PrinterQueryBrowser from "../components/PrinterQueryBrowser/Browser";
import Printer from "../model/Printer";

export default {
  data() {
    return {
      statusStyles: ["success", "warning", "danger", "dark"],
      graphOptions: GraphTemplates.CLEAN,
      graphData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Pages Printed",
            // backgroundColor: ""
            data: [5, 1, 4, 4, 8, 1, 2]
          }
        ]
      }
    };
  },
  components: {
    LineGraph,
    PrinterQueryBrowser
  },
  computed: {
    printerData() {
      let printer = this.$store.state.printer_data.printers[
        this.$route.params.id
      ];
      return printer;
      // return printer != null ? printer : new Printer('Offline', this.$route.params.id);
    },
    printers() {
      return this.$store.state.printer_data.printers;
    },
    supplyThresholds() {
      return this.$store.state.settings.supplyThresholds;
    },
    printerStatusCode() {
      const printer = this.printerData;
      const thresholds = this.supplyThresholds;

      if (printer.isOffline()) return 3;

      let tonerStatus = printer.tonerStatusCode(thresholds[0].value);
      let drumStatus = printer.drumStatusCode(thresholds[1].value);
      let trayStatusCode = printer.trayStatusCode();
      let maintKitStatus = printer.maintKitStatusCode(thresholds[2].value);
      let isJammed = printer.printerJamStatusCode();

      return Math.max(
        tonerStatus,
        drumStatus,
        maintKitStatus,
        isJammed,
        trayStatusCode
      );
    },
    pagesPrinted() {
      return this.commaNumber(this.printerData.pagesPrinted.toString());
    }
  },
  methods: {
    commaNumber(number) {
      return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>


<style scoped>
#titlebar {
  /* font-weight: 600; */
  font-size: 50px;
}

#supply-information {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  grid-gap: 1rem;
}

#supply-information2 {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 500px;
}

.supply-card {
}

#query-browser {
}
</style>
