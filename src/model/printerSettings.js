

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

export const settings = {

  timeout: 4000,
  refreshRate: 1, // In minutes
  supplyThreshold: 1000,
  loadTestData: false

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
  

export default {
  printer_urls,
  settings,
  options
}