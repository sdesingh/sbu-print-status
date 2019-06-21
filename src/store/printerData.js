import Vue from 'vue'
import axios from 'axios'
import { Printer } from '../model/Printer';

export default {

  state: {
    printers: [],
  },
  mutations: { 
    initializePrinterData(state, new_data){
      state.printers = new_data
    },
    updatePrinterData(state, printerData){
      Vue.set(state.printers, printerData.index, printerData)
    }
  },
  actions: {

    /**
     * Retrieves the data for all printers then updates the state.
     * @param {*} context 
     */
    getData({state, commit, dispatch, rootState}){

      const app_settings = rootState.settings

      const request_settings = {
        timeout: app_settings.timeout,
        responseType: 'json'
      }

      // Generate test data.
      if(app_settings.useTestData){

        app_settings.printer_data.forEach((printer_info, index) => {

          let printer = Printer.GenerateRandomPrinter(printer_info.name, index);
          
          commit('updatePrinterData', printer);

        })
      }
      // Retrieve data.
      else {

        axios.get(app_settings.baseUrl, request_settings)
          .then(

            (response) => {

              response.data.forEach((printerData, index) => {
                
                let printer = Printer.ParsePrinterJSON(printerData);
                printer.webSeverURL = app_settings.printer_data[index].url
                commit('updatePrinterData', printer);

              });

            },

            (error) => {
              
              console.log("An error has occured while connecting to the API.");
              console.log(error);

            }

          )
          
      } 
      
    
    },
    /**
     * Generates the default data for the printers.
     * @param {*} context 
     */
    init({rootState, commit}){
      
      let new_data = []
      const app_settings = rootState.settings
      const printer_data = rootState.settings.printer_data

      // printer_data.forEach((printer_info, index) => {

        
      //   let printer = new Printer(printer_info.name, index);
      //   new_data.push(printer)

      // })

      commit('initializePrinterData', new_data);

    }
    

  },
  
}