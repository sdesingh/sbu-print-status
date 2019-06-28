<template>
  <div>

    <h5 class="card-title">Printer Logs</h5>
    <p class="card-text">Find the printer's status at a certain point in time. Use the date and time pickers to select the time. </p>

    <!-- Input Group for refining your search. -->
    <div id="search-select">
      <date-time-picker v-model="queryDateTime" :color="'#28a745'" :format="'MM-DD-YY hh:mm a'"/>
      <button type="button" class="btn btn-success" @click="makeQuery()" :disabled="!isValidQuery">Search</button>
    </div>


    <!-- Time Interval Selector -->
    <div class="input-group-prepend">
      <button class="btn btn-outline-success dropdown-toggle" type="button" data-toggle="dropdown"> {{ selectedInterval }} </button>
      <div class="dropdown-menu">
        <!-- vFor all the supplies loaded. -->
        <a v-for="(interval, i) in intervals" :key="i" class="dropdown-item" @click="setSelectedInterval(i)"> {{ interval }} </a>
      </div>
    </div>


    <printer-info-card :printer="queryData" v-if="querySuccessfull" class="mt-3"/>

    <table id="example" class="table table-striped table-bordered mt-4" style="width:100%">
      <thead>
        <tr>
          <th scope="col">Updated At</th>
          <th scope="col">Trays</th>
          <th scope="col">Supplies</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
    </table>

  </div>
</template>

<script>

import DateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import PrinterInfoCard from '../components/PrinterInfoCard'

import axios from 'axios'
import { Printer } from '../model/Printer'
import { baseUrl, timeout } from '../printerSettings'

export default {
  mounted(){
    this.querySuccessfull = false;
    this.queryDateTime = null;
  },
  components: {
    DateTimePicker,
    PrinterInfoCard
  },
  data(){
    return {
      queryData: null,
      querySuccessfull: false,
      queryDateTime: null,

      intervals: ['Exact', '5 Minutes', '10 Minutes', '30 Minutes', '1 Hour'],
      selectedIntervalIndex: 0,
      itemsPerPage: 10
    }
  },
  methods: {
    makeQuery(){

      this.querySuccessfull = false;

      let printerID = this.$route.params.id;
      let dateTime = this.queryDateTime;
      let numberOfRecords = 2


      this.$toasted.show('Loading Query...',
        // Toast Options
        {
          position: 'bottom-right',
          duration: 2500,
          icon : {
              name : 'fa-hourglass',
              after : true
          }
        }
      );

      let httpRequestSettings = {
        timeout: timeout,
        responseType: 'json'
      };


      let queryURL = `${printerID}/?time=${dateTime}`;
      let requestURL = baseUrl + queryURL;

      axios.get(requestURL, httpRequestSettings)
        .then(

          (response) => {
            this.queryData = Printer.ParsePrinterJSON(response.data);
            this.querySuccessfull = true;

            this.$toasted.show('Data Retrieved.',
            // Toast Options
            {
              position: 'bottom-right',
              duration: 2500,
              icon : {
                  name : 'fa-check-circle',
                  after : true
              }
            });

          },

          (error) => {

            console.log('An error has occured while making the query.');
            console.log(`Query URL: ${requestURL}`);


            this.$toasted.show('An error has occured while making the query.',
            // Toast Options
            {
              position: 'bottom-right',
              type: 'error',
              duration: 2500,
              icon : {
                  name : 'fa-exclamation-triangle',
                  after : true
              }
            });

          }

        )

    },
    setSelectedInterval(index){
      this.selectedIntervalIndex = index;
    },
    getQueryURL(){
      
    }
  },
  computed: {
    isValidQuery(){
      if(this.queryDateTime == null){
        return false;
      }
      return true;
    },
    selectedInterval(){ return this.intervals[this.selectedIntervalIndex]; },

  },

}
</script>

<style scoped>
  .card-title {
    font-weight: 600;
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
