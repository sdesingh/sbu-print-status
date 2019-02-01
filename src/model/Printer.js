// Generates a Printer with default status.
export function Printer(url, index) {
  return {
    data: {
      name: url.name,
      statusCode: 3,
      statusSummary: 'Loading...',
      supplies: {
        toner: {status: 'Loading...', statusCode: 3},
        drum: {status: 'Loading...', statusCode: 3},
        maintenance: {status: 'Loading...', statusCode: 3}
      },
      trays: [/* tray size capacity */],
    },
    index: index,
  }
}

// Generats a Printer with random status.
export function RandomPrinter(url, index) {
  let printer = Printer(url, index)

  // Change the number of trays generated.
  var j = 4
  if(index > 5) j = 2

  // Generate random trays.
  for(let i = 1; i <= j; i++){

    const rng = (Math.random() * (100-1)) + 1

    if(rng <= 5 * 5-i){
      printer.data.trays.push({tray: `Tray ${i+1}`, size: 'Letter', capacity: 'Empty', statusCode: 2})
    }else {
      printer.data.trays.push({tray: `Tray ${i+1}`, size: 'Letter', capacity: 'Full', statusCode: 0})
    }

  }

  // Generate random supply status
  const rng = (Math.random() * (100-1)) + 1
  if(rng < 10 && rng > 5){
    printer.data.supplies.toner.status = '800-1002 Pages Remaining'
  }
  else if(rng < 5){
    printer.data.supplies.toner.status = 'Replace'
    
  }
  else{
    printer.data.supplies.toner.status = '21003-23005 Pages Remaining'
  }

  printer.data.supplies.drum.status = '11000-12043 Pages Remaining'
  printer.data.supplies.maintenance.status = '100231 Pages Remaining'

  return printer
}

// Takes a Printer object and then computes the printer's status code.
/**
 *  STATUS CODES
 *  0 -> Good  | 1 -> Warning | 2 -> Emergency | 3 -> Offline
 */
export function computePrinterStatusCode(printerData, settings){

  const printerSupplies = printerData.supplies
  const printerTrays = printerData.trays

  let traysFull = 0 // Number of trays Full.
  let traysLow = 0 // Number of trays Low.
  let traysEmpty = 0 // Number of trays empty.
  const totalTrays = printerTrays.length

  // Compute the status of the trays.
  printerTrays.forEach(tray => {

    let statusCode = tray.statusCode

    switch(statusCode){

      case 0: traysFull++
      break

      case 1: traysLow++
      break

      case 2: traysEmpty++
      break

      default: traysEmpty++
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
  let jamStatus = 0

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

  if(printerData.statusSummary.includes('Jam') || printerData.statusSummary.includes('JAM')){
    jamStatus = 2
  }

  printerSupplies.maintenance.statusCode = maintKitStatus

  return Math.max(tonerStatus, drumStatus, maintKitStatus, trayStatus, jamStatus)

}


export default {
  Printer,
  RandomPrinter,
  computePrinterStatusCode,
}