import axios from 'axios'
import cheerio from 'cheerio'


let options = {
  timeout: 3000,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  responseType: 'text',
  crossdomain: true
}


function getStatus(printer_url){
  return axios.get(printer_url + '/status.html', options)
}

function getSupplies(printer_url){
  return axios.get(printer_url + '/consumables.html', options)
}

function parseStatus(data, printerData){

  const $ = cheerio.load(data)

  $('#TrayCol').each((i, elem) => {

      printerData.trays.push({

        tray: $(elem).text(),
        size: '',
        capacity: ''

      })
    
  })

  $('#SizeCol').each((i, elem) => {
      printerData.trays[i].size = $(elem).text()
  })

  $('#CapacityCol').each((i, elem) => {
    printerData.trays[i].capacity = $(elem).text()
  })

}

function parseSupplies(data, printerData){

  const $ = cheerio.load(data)

  $('#supplytd13').each((i, elem) => {

    let data = $(elem).text()
    switch(i){
      case 0: 
        printerData.supplies.toner = data
        break;
      case 1: 
        printerData.supplies.drum = data
        break;
      case 2: 
        printerData.supplies.maintenance = data
        break;
      default: 
        return false
    }

  })

}

export default {
  getSupplies,
  getStatus,
  parseStatus,
  parseSupplies
}