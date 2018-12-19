import Vue from 'vue'
import { printer_urls, get_default_printer } from '../printerSettings'
import Scraper from '../scraper'
import axios from 'axios'

export default {

  state: {
    printers: [],
    printer_urls: printer_urls
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
    getData(context){

      // Loop through all the printer urls.
      context.state.printer_urls.forEach((printer_url, index) => {

        // Get default data object.
        let printerData = get_default_printer(printer_url, index)
        
        // Make get request for the tray and supply status of the printer.
        axios.all([Scraper.getStatus(printer_url.url), Scraper.getSupplies(printer_url.url)])

          // Parse the data if the request is successfull.
          .then(axios.spread((status, supplies) => {

            // Data retrieved successfully. Parse data.
            Scraper.parseStatus(status.data, printerData.data)
            Scraper.parseSupplies(supplies.data, printerData.data)
            Scraper.trayStatus(printerData.data.trays)
            
            printerData.data.statusCode = Scraper.printerStatus(printerData.data)
            context.commit('updatePrinterData', printerData);

          // Error retrieving data.   
          }))
          .catch( error =>  {
              console.log(error)
              printerData.data.statusCode = 3
              context.commit('updatePrinterData', printerData);
            } 
          )
          
      });
      
    
    },
    /**
     * Generates the default data for the printers.
     * @param {*} context 
     */
    init(context){

      let new_data = []

      context.state.printer_urls.forEach((printer_url, index) => {

        let printerData = get_default_printer(printer_url, index)

        new_data.push(printerData.data)

      })

      context.commit('initializePrinterData', new_data);

    }
    

  },
  
}