import Vue from 'vue'
import PrinterModel from '../model/Printer'
import Scraper from '../util/scraper'
import axios from 'axios'

export default {

  state: {
    printers: [],
  },
  mutations: { 
    initializePrinterData(state, new_data){
      state.printers = new_data
    },
    updatePrinterData(state, printerData){
      Vue.set(state.printers, printerData.index, printerData.data)
    }
  },
  actions: {

    /**
     * Retrieves the data for all printers then updates the state.
     * @param {*} context 
     */
    getData({state, commit, dispatch, rootState}){

      const app_settings = rootState.settings

      // Test Data Enabled
      if(app_settings.useTestData){
        app_settings.printerURLs.forEach((printer_url, index) => {

          let printerData = PrinterModel.RandomPrinter(printer_url, index)
          
          printerData.data.statusCode = PrinterModel.computePrinterStatusCode(printerData.data, app_settings)
          commit('updatePrinterData', printerData)

        })
        return
      }

      const request_settings = {
        timeout: app_settings.timeout,
        responseType: 'text'
      }

      // Loop through all the printer urls.
      app_settings.printerURLs.forEach((printer_url, index) => {

        // Get default data object.
        let printerData = PrinterModel.Printer(printer_url, index)
        
        // Make get request for the tray and supply status of the printer.
        axios.all([Scraper.getStatus(printer_url.url, request_settings), Scraper.getSupplies(printer_url.url, request_settings)])

          // Parse the data if the request is successfull.
          .then(axios.spread((status, supplies) => {

            // Data retrieved successfully. Parse data.
            Scraper.parseStatus(status.data, printerData.data)
            Scraper.parseSupplies(supplies.data, printerData.data)
            Scraper.trayStatus(printerData.data.trays)
            
            // Computes the status code of the printer.
            printerData.data.statusCode = PrinterModel.computePrinterStatusCode(printerData.data, app_settings)

            // Commit data.
            commit('updatePrinterData', printerData);

          // Error retrieving data.   
          }))
          .catch( error =>  {
              console.log(error)
              // Set the STATUS CODE to 3. Indicating the printer is offline.
              printerData.data.statusCode = 3
              commit('updatePrinterData', printerData);
            } 
          )
          
      });
      
    
    },
    /**
     * Generates the default data for the printers.
     * @param {*} context 
     */
    init({rootState, commit}){
      
      let new_data = []
      const printerURLs = rootState.settings.printerURLs

      printerURLs.forEach((printer_url, index) => {

        let printerData = PrinterModel.Printer(printer_url, index)

        new_data.push(printerData.data)

      })

      commit('initializePrinterData', new_data);

    }
    

  },
  
}