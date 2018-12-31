import axios from 'axios'
import cheerio from 'cheerio'

/**
 * Returns a promise with the HTML content of the status page.
 * @param {String} printer_url 
 */
function getStatus(printer_url, request_options){
  return axios.get(printer_url + '/status.html', request_options)
}

/**
 * Returns a promise with the HTML content of the consumables page. 
 * @param {String} printer_url 
 */
function getSupplies(printer_url, request_options){
  return axios.get(printer_url + '/consumables.html', request_options)
}

function parseStatus(data, printerData){

  const $ = cheerio.load(data)

  $('#TrayCol').each((i, elem) => {

      printerData.trays.push({

        tray: $(elem).text(),
        size: '',
        capacity: '',
        statusCode: 3

      })
    
  })

  $('#SizeCol').each((i, elem) => {
      printerData.trays[i].size = $(elem).text()
  })

  $('#CapacityCol').each((i, elem) => {
    printerData.trays[i].capacity = $(elem).text()
  })

  printerData.trays.splice(0, 2)

}

function parseSupplies(data, printerData){

  const $ = cheerio.load(data)

  $('#supplytd13').each((i, elem) => {

    // Remove the 'remaining' text
    let data = $(elem).text()
    if(data.indexOf(' Remaining') != -1){
      data = data.substring(0, data.indexOf(' Remaining'))
    }
    
    switch(i){
      case 0: 
        printerData.supplies.toner.status = data
        break;
      case 1: 
        printerData.supplies.drum.status = data
        break;
      case 2: 
        printerData.supplies.maintenance.status = data
        break;
      default: 
        return false
    }

  })

}

// Takes an array of Tray objects then computes the status for each tray.
/**
 *  STATUS CODES
 *  0 -> Full  | 1 -> Low | 2 -> Empty | 3 -> Missing
 * 
 * @param {JSON[]} trays 
 */
function trayStatus(trays){

  trays.forEach(tray => {

    let statusCode = 0

    switch(tray.capacity){

      case 'Full': statusCode = 0
      break;

      case 'Low': statusCode = 1
      break;

      case 'Empty': statusCode = 2
      break;

      case 'Missing': statusCode = 3
      break;

      default: statusCode = 3

    }

    tray.statusCode = statusCode

  })

}

/**
 * Takes a JSON object and then computes the printer's status.
 *  STATUS CODES
 *  0 -> Good  | 1 -> Warning | 2 -> Emergency | 3 -> Offline
 * 
 * @param {JSON} printerData 
 */
function printerStatus(printerData, settings){

  const printerSupplies = printerData.supplies
  const printerTrays = printerData.trays

  let traysFull = 0 // Number of trays Full.
  let traysLow = 0 // Number of trays Low.
  let traysEmpty = 0 // Number of trays empty.
  const totalTrays = printerTrays.length

  // Compute the status of the trays.
  printerTrays.forEach(tray => {

    let currentCapacity = tray.capacity

    if(currentCapacity == 'Full'){
      traysFull++
    }
    else if(currentCapacity == 'Low'){
      traysLow++
    }
    else if(currentCapacity == 'Empty'){
      traysEmpty++
    }
  });

  let trayStatus = 0 // Status code for the trays.

  if(traysFull + traysLow > 1){
    trayStatus = 0 // STATUS CODE 0. More than one tray with paper.
  }
  else if(traysFull + traysLow == 1){
    
    // Special case for Smaller printers
    if(totalTrays != 2){
      trayStatus = 1 // STATUS CODE 1. One tray with paper left.
    }else {
      if(traysLow + traysFull == 1)
      trayStatus = 0
    }
    
  }
  else {
    trayStatus = 2 // STATUS CODE 2. // No trays with paper.
  }

  // Compute the status of the supplies.
  let tonerStatus = 0
  let drumStatus = 0
  let maintKitStatus = 0

  // Find toner status.
  if(printerSupplies.toner.status == 'Replace') tonerStatus = 2
  else{
    let pages = parseInt(printerSupplies.toner.status.substring(0, printerSupplies.toner.status.indexOf('-')))

    if(pages < settings.supplyThreshold) tonerStatus = 1
  }

  printerSupplies.toner.statusCode = tonerStatus

  // Find drum status.
  if(printerSupplies.drum.status == 'Replace') drumStatus = 2
  else {
    let pages = parseInt(printerSupplies.drum.status.substring(0, printerSupplies.drum.status.indexOf('-')))

    if(pages < settings.supplyThreshold) drumStatus = 1
  }
  printerSupplies.drum.statusCode = drumStatus

  // Find maintenance kit status.
  if(printerSupplies.maintenance.status == 'Replace') maintKitStatus = 2
  else {
    let pages = parseInt(printerSupplies.maintenance.status)

    if(pages < settings.supplyThreshold) maintKitStatus = 1
  }

  printerSupplies.maintenance.statusCode = maintKitStatus

  return Math.max(tonerStatus, drumStatus, maintKitStatus, trayStatus)

}


export default {
  getSupplies,
  getStatus,
  parseStatus,
  parseSupplies,
  trayStatus,
  printerStatus,
}