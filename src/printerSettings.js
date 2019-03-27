/**
 *  ADD PRINTERS HERE
 * 
 *  {url: 'LINK TO THE PRINTER'S SITE', name: 'NAME OF LOCATION'}
 */
export const printer_data = [

  {url: 'http://cr-irvxrx1.sinc.stonybrook.edu', name: 'Irving'},
  {url: 'http://cr-chzxrx1.sinc.stonybrook.edu', name: 'Chavez RCC'},
  {url: 'http://cr-tubxrx1.sinc.stonybrook.edu', name: 'Tubman RCC'},
  {url: 'http://cr-rotxrx1.sinc.stonybrook.edu', name: 'Roth Café'},
  {url: 'http://cr-glsxrx1.sinc.stonybrook.edu', name: 'GLS Center'},
  {url: 'http://cr-wscxrx1.sinc.stonybrook.edu', name: 'West Commons'},
  {url: 'http://cr-chaxrx1.sinc.stonybrook.edu', name: 'Chapin RCC'},
  {url: 'http://cr-onexrx1.sinc.stonybrook.edu', name: 'O\'neill RCC'},
  {url: 'http://cr-douxrx1.sinc.stonybrook.edu', name: 'Douglass RCC'},
  {url: 'http://cr-nobxrx1.sinc.stonybrook.edu', name: 'Nobel RCC'},
  {url: 'http://cr-wesxrx1.sinc.stonybrook.edu', name: 'West RCC'},
  {url: 'http://cr-carxrx1.sinc.stonybrook.edu', name: 'Cardozo RCC'},
  {url: 'http://cr-benxrx1.sinc.stonybrook.edu', name: 'Benedict RCC'},
  {url: 'http://cr-barxrx1.sinc.stonybrook.edu', name: 'Baruch RCC'},

]

export const baseUrl = 

(process.env.NODE_ENV == "production") ? // Use Dev or Production API
 'http://crweb2.campus.stonybrook.edu:443/api/printers/': 'http://localhost:443/api/printers/';

// Defaults.
export const refreshRate = 1
export const timeout = 5000