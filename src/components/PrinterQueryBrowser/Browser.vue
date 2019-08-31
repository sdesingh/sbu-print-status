<template>
  <div>
    <h5 class="card-title">Printer Logs</h5>
    <p
      class="card-text"
    >Find the printer's status at a certain point in time. Use the date and time pickers to select the time.</p>

    <!-- Input Group for refining your search. -->
    <div id="search-select">
      <date-time-picker v-model="queryDateTime" :color="'#28a745'" :format="'MM-DD-YY hh:mm a'"/>
      <button
        type="button"
        class="btn btn-success"
        @click="makeQuery()"
        :disabled="!isValidQuery"
      >Search</button>
    </div>

    <div id="filters" class="mt-3">
      <dropdown :value="intervalSelector"/>
      <dropdown :value="itemCountSelector"/>
    </div>

    <data-table :data="queryData"/>

    <!-- <printer-info-card :printer="queryData" v-if="querySuccessfull" class="mt-3"/> -->
  </div>
</template>

<script>
import DateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";
import PrinterInfoCard from "../PrinterInfoCard";
import Dropdown from "../Interactables/DropdownMenu";
import DataTable from "../PrinterQueryBrowser/PrinterTable";

import axios from "axios";
import { Printer } from "../../model/Printer";
import { baseUrl, timeout } from "../../printerSettings";

export default {
  mounted() {
    this.querySuccessfull = false;
    this.queryDateTime = null;
  },
  components: {
    DateTimePicker,
    PrinterInfoCard,
    DataTable,
    Dropdown
  },
  data() {
    return {
      queryData: null,
      querySuccessfull: false,
      queryDateTime: null,
      intervalSelector: {
        options: ["Exact", "5 Minutes", "10 Minutes", "30 Minutes", "1 Hour"],
        optionValues: [1, 5, 10, 30, 60],
        selectedOptionIndex: 0
      },
      itemCountSelector: {
        options: [5, 10, 20, 50],
        selectedOptionIndex: 2
      }
    };
  },
  methods: {
    makeQuery() {
      this.querySuccessfull = false;

      let printerID = this.$route.params.id;
      let dateTime = this.queryDateTime;
      let numberOfRecords = 2;

      this.$toasted.show(
        "Loading Query...",
        // Toast Options
        {
          position: "bottom-right",
          duration: 2500,
          icon: {
            name: "fa-hourglass",
            after: true
          }
        }
      );

      let httpRequestSettings = {
        timeout: timeout,
        responseType: "json"
      };

      let step = this.intervalSelector.optionValues[
        this.intervalSelector.selectedOptionIndex
      ];
      let count = this.itemCountSelector.options[
        this.itemCountSelector.selectedOptionIndex
      ];
      let queryURL = `logs/${printerID}/?time=${dateTime}&step=${step}&count=${count}`;
      let requestURL = baseUrl + queryURL;

      axios.get(requestURL, httpRequestSettings).then(
        response => {
          let printers = [];

          for (let i = 0; i < response.data.length; i++) {
            const printer = Printer.ParsePrinterJSON(response.data[i]);
            printers.push(printer);
          }

          this.queryData = printers;
          this.querySuccessfull = true;

          this.$toasted.show(
            "Data Retrieved.",
            // Toast Options
            {
              position: "bottom-right",
              duration: 2500,
              icon: {
                name: "fa-check-circle",
                after: true
              }
            }
          );
        },

        error => {
          console.log("An error has occured while making the query.");
          console.log(`Query URL: ${requestURL}`);

          this.$toasted.show(
            "An error has occured while making the query.",
            // Toast Options
            {
              position: "bottom-right",
              type: "error",
              duration: 2500,
              icon: {
                name: "fa-exclamation-triangle",
                after: true
              }
            }
          );
        }
      );
    },
    setSelectedInterval(index) {
      this.selectedIntervalIndex = index;
    },
    getQueryURL() {}
  },
  computed: {
    isValidQuery() {
      if (this.queryDateTime == null) {
        return false;
      }
      return true;
    },
    selectedInterval() {
      return this.intervals[this.selectedIntervalIndex];
    }
  }
};
</script>

<style scoped>
.card-title {
  font-weight: 600;
}

#filters {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
}

#search-select {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 30px;
  grid-template-rows: 1fr;
}

#loader {
  height: 150px;
  width: 150px;
}

th {
  border-bottom: 5px solid red;
}
</style>
