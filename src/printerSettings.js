/**
 *  ADD PRINTERS HERE
 * 
 *  {url: 'LINK TO THE PRINTER'S SITE', name: 'NAME OF LOCATION'}
 */
export const printer_data = [

  {url: 'http://cr-irvxrx1.sinc.stonybrook.edu', name: 'Irving', id: 0},
  {url: 'http://cr-chzxrx1.sinc.stonybrook.edu', name: 'Chavez RCC', id: 1},
  {url: 'http://cr-tubxrx1.sinc.stonybrook.edu', name: 'Tubman RCC', id: 2},
  {url: 'http://cr-rotxrx1.sinc.stonybrook.edu', name: 'Roth Café', id: 3},
  {url: 'http://cr-glsxrx1.sinc.stonybrook.edu', name: 'GLS Center', id: 4},
  {url: 'http://cr-wscxrx1.sinc.stonybrook.edu', name: 'West Commons', id: 5},
  {url: 'http://cr-chaxrx1.sinc.stonybrook.edu', name: 'Chapin RCC', id: 6},
  {url: 'http://cr-onexrx1.sinc.stonybrook.edu', name: 'O\'neill RCC', id: 7},
  {url: 'http://cr-nobxrx1.sinc.stonybrook.edu', name: 'Nobel RCC', id: 9},
  {url: 'http://cr-wesxrx1.sinc.stonybrook.edu', name: 'West RCC', id: 10},
  {url: 'http://cr-carxrx1.sinc.stonybrook.edu', name: 'Cardozo RCC', id: 11},
  {url: 'http://cr-benxrx1.sinc.stonybrook.edu', name: 'Benedict RCC', id: 12},
  {url: 'http://cr-barxrx1.sinc.stonybrook.edu', name: 'Baruch RCC', id: 13},
  {url: 'http://cr-douxrx1.sinc.stonybrook.edu', name: 'Douglass RCC', id: 8},

  // Random Printers Can Comment Out
  // {url: 'http://cr-douxrx1.sinc.stonybrook.edu', name: 'Phoenix', id: 14},
  // {url: 'http://cr-douxrx1.sinc.stonybrook.edu', name: 'Pawnee', id: 15},
  // {url: 'http://cr-douxrx1.sinc.stonybrook.edu', name: 'Atlantis', id: 16},

]

export const ROUTES = {
  browser: '/browser/',
  
}

export const supply_thresholds = [
  {name: 'Toner', value: 1500},
  {name: 'Drum Kit', value: 2000},
  {name: 'Maintenance Kit', value: 5000}
]

export const baseUrl = 

// (process.env.NODE_ENV == "production") ? // Use Dev or Production API
  true ?
 'http://crweb2.campus.stonybrook.edu:443/api/printers/' : 'http://localhost:443/api/printers/';

// Defaults.
export const refreshRate = 1
export const timeout = 5000