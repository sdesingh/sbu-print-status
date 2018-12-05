import Vue from 'vue'
import Vuex from 'vuex'
import Scraper from './model/scraper.js'
import axios from 'axios'

Vue.use(Vuex)

const printer_data = {
  state: {
    printers: [],
    printer_urls: [
      'http://cr-onexrx1.sinc.stonybrook.edu',
      'http://cr-irvxrx1.sinc.stonybrook.edu',
      'http://cr-rotxrx1.sinc.stonybrook.edu'
    ]

  },
  mutations: { 
    updatePrinterData(state, new_data){
      state.printers = new_data
    }
  },
  actions: {
    getData(context){
      
      let new_data = []

      context.state.printer_urls.forEach(printer_url => {

        let printerData = {
          supplies: {
            toner: '',
            drum: '',
            maintenance: ''
          },
          trays: []
        }
      
        axios.all([Scraper.getStatus(printer_url), Scraper.getSupplies(printer_url)])
          .then(axios.spread((status, supplies) => {

            // Data retrieved successfully. Parse data.
            Scraper.parseStatus(status.data, printerData)
            Scraper.parseSupplies(supplies.data, printerData)
      
            new_data.push(printerData)

          }))
          .catch(error => {console.log(error.message)})

      });
      
      

      context.commit('updatePrinterData', new_data)
    
    }
  }
}

export default new Vuex.Store({
  modules: {
    printer_data
  }
})
