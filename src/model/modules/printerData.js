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

      context.state.printer_urls.forEach((printer_url, index) => {

        let printerData = get_default_printer(printer_url, index)
      
        axios.all([Scraper.getStatus(printer_url.url), Scraper.getSupplies(printer_url.url)])
          .then(axios.spread((status, supplies) => {

            // Data retrieved successfully. Parse data.
            Scraper.parseStatus(status.data, printerData.data)
            Scraper.parseSupplies(supplies.data, printerData.data)
      
            context.commit('updatePrinterData', printerData);

            

          }))
          .catch( error =>  {
              console.log(error)
              context.commit('updatePrinterData', printerData);
            } 
          )
          
      });
      
    
    },
    /**
     * Loads the default data for the printers.
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