/**
 *  ADD PRINTERS HERE
 * 
 *  {url: 'LINK TO THE PRINTER'S SITE', name: 'NAME OF LOCATION'}
 */
export const printer_urls = [

  {url: 'http://cr-irvxrx1.sinc.stonybrook.edu', name: 'Irving'},
  {url: 'http://cr-chzxrx1.sinc.stonybrook.edu', name: 'Chavez'},
  {url: 'http://cr-tubxrx1.sinc.stonybrook.edu', name: 'Tubman'},
  {url: 'http://cr-rotxrx1.sinc.stonybrook.edu', name: 'Roth'},
  {url: 'http://cr-glsxrx1.sinc.stonybrook.edu', name: 'GLS Center'},
  {url: 'http://cr-wscxrx1.sinc.stonybrook.edu', name: 'West'},
  {url: 'http://cr-chaxrx1.sinc.stonybrook.edu', name: 'Chapin'},
  {url: 'http://cr-onexrx1.sinc.stonybrook.edu', name: 'O\'neill'},
  {url: 'http://cr-douxrx1.sinc.stonybrook.edu', name: 'Douglass'},
  {url: 'http://cr-nobxrx1.sinc.stonybrook.edu', name: 'Nobel'},
  {url: 'http://cr-wesxrx1.sinc.stonybrook.edu', name: 'West RCC'},
  {url: 'http://cr-carxrx1.sinc.stonybrook.edu', name: 'Cardozo'},
  {url: 'http://cr-benxrx1.sinc.stonybrook.edu', name: 'Benedict'},
  {url: 'http://cr-barxrx1.sinc.stonybrook.edu', name: 'Baruch'},

]

export var settings = {

  timeout: 4000,
  refreshRate: 2, // In minutes
  supplyThreshold: 1000,
  loadTestData: true

}


export const options = {
  timeout: settings.timeout,
  responseType: 'text',
}

export function get_default_printer(url, index) {
  return {
    data: {
      name: url.name,
      statusCode: 0,
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

/**
 * Loads random data for printer. 
 * FOR TESTING ONLY.
 * 
 * @param {*} url 
 * @param {*} index 
 */
export function get_test_printer(url, index){
  let printer = get_default_printer(url, index)

  var j = 4
  if(index > 5) j = 2

  for(let i = 1; i <= j; i++){

    const rng = (Math.random() * (100-1)) + 1

    if(rng <= 5 * 5-i){
      printer.data.trays.push({tray: `Tray ${i+1}`, size: 'Letter', capacity: 'Empty', statusCode: 2})
    }else {
      printer.data.trays.push({tray: `Tray ${i+1}`, size: 'Letter', capacity: 'Full', statusCode: 0})
    }

  }

  
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

export default {
  printer_urls,
  settings,
  options
}