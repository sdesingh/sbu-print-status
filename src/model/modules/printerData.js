import Vue from 'vue'
import Settings from '../printerSettings'
import Scraper from '../scraper'
import axios from 'axios'

export default {

  state: {
    printers: [],
    printer_urls: Settings.printer_urls
  },
  mutations: { 
    updatePrinterData(state, new_data){
      state.printers = new_data
    },
    updateDataFor(state, printerData){
      Vue.set(state.printers, printerData.index, printerData.data)
    }

  },
  actions: {
    getData(context){

      context.state.printer_urls.forEach((printer_url, index) => {

        let printerData = {
          data: {
            name: printer_url.name,
            supplies: {
              toner: '',
              drum: '',
              maintenance: ''
            },
            trays: []
          },
          index: index
        }
      
        axios.all([Scraper.getStatus(printer_url.url), Scraper.getSupplies(printer_url.url)])
          .then(axios.spread((status, supplies) => {

            // Data retrieved successfully. Parse data.
            Scraper.parseStatus(status.data, printerData.data)
            Scraper.parseSupplies(supplies.data, printerData.data)
      
            // context.commit('updatedData', printerData, index)
            // new_data[index] = printerData
            context.commit('updateDataFor', printerData);

            

          }))
          .catch( error =>  console.log(error) )
          
      });
      
    
    },
    init(context){

      let new_data = []

      context.state.printer_urls.forEach((url) => {

        let printerData = {
          name: url.name,
          supplies: {
            toner: 'Loading...',
            drum: 'Loading...',
            maintenance: 'Loading...'
          },
          trays: [{tray: 'Loading', size: '', capacity: ''}]
        }

        new_data.push(printerData)

      })

      context.commit('updatePrinterData', new_data);

    }
    

  },
  
}