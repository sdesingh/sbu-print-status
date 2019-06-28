import _ from 'lodash';
import moment from 'moment'

export class Printer {

  constructor(name, index){
    this.name = name;
    this.index = index;

    this.tonerStatus = 'Unknown';
    this.drumStatus = 'Unknown';
    this.maintKitStatus = 'Unknown';
    this.statusMessage = 'Offline';

    this.printerStatus = 3;
    this.printerType = 0; // 0: Print from Anywhere, 1: RCC Lab
    this.webSeverURL = "nada";

    this.pagesPrinted = 0;

    this.trays = [];

    this.updatedAt = Date.now;

  }

  isOffline(){
    return this.statusMessage === "Offline";
  }

  tonerStatusCode(threshold){

    if(this.tonerStatus == 0) return 2;
    else return this.tonerStatus < threshold ? 1 : 0;

  }

  drumStatusCode(threshold){

    if(this.drumStatus == 0) return 2;
    else return this.drumStatus < threshold ? 1 : 0;
    
  }

  printerJamStatusCode(){
    
    if(this.statusMessage.includes("Jam")){
      return 2;
    }
    else {
      return 0;
    }

  }

  trayStatusCode(){
    
    let traysEmpty = 0;
    let traysLow = 0;
    let traysFull = 0;

    this.trays.forEach(tray => {

      switch(tray.statusCode){

        case 0: traysFull++;
        break;

        case 1: traysLow++;
        break;

        case 2: traysEmpty++;
        break;

        default: traysEmpty++;
      }

    });

    // At least two trays that are full or less.
    if(traysFull + traysLow > 1){
      return 0;
    }
    // Only one tray remaining.
    else if(traysFull + traysLow === 1){
      return 1;
    }
    // No more paper remaining.
    else {
      return 2;
    }

  }

  maintKitStatusCode(threshold){

    if(this.maintKitStatus == 0) return 2;
    else return this.maintKitStatus < threshold ? 1 : 0;

  }

  /**
   * Parses the json that is passed in and returns a new printer with the data.
   * @param {*} printerJSON JSON object with the printer data.
   * @param {*} printerName Name of the printer.
   * @param {*} printerIndex The index of the printer.
   * @param {*} printerUrl The url of the printer's web server.
   * @returns {Printer} A new printer object.
   */
  static ParsePrinterJSON(data) {

    let printer = new Printer(data.printerName, data.id);

    // Parse printer trays.
    data.trays.forEach(tray => {

      // Create a new tray.
      let newTray = new Tray(tray.trayName, tray.trayStatus, tray.traySetting);

      // Add Tray to the newly created printer object.
      printer.trays.push(newTray);

    });

    // Set supply status.
    printer.tonerStatus = data.tonerStatus;
    printer.drumStatus = data.drumKitStatus;
    printer.maintKitStatus = data.maintKitStatus;

    // Set main printer status.
    printer.printerStatus = 0;

    // Set printer status message.
    printer.statusMessage = data.printerStatus;
    if(printer.statusMessage === 'Offline') printer.printerStatus = 3;

    // Set printer type.
    printer.printerType = 0;

    // Set printer index.
    printer.index = data.printerId

    // Set Pages Printer
    printer.pagesPrinted = data.pageCount

    let date = new Date(data.updatedAt);
    printer.updatedAt = date.toLocaleString('default');

    return printer;
  }

  /**
   * Generate a printer with a random status.
   * @param {*} printerName 
   * @param {*} printerUrl 
   * @param {*} printerIndex 

   */
  static GenerateRandomPrinter(printerName, printerUrl, printerIndex){

    // Create a printer.
    let printer = new Printer(printerName, printerUrl, printerIndex);
    printer.printerStatus = 0;

    // Number of random trays to generate.
    let traysGenerated = 4;
    let emptyGenerated = 0;
    let fullGenerated = 0;

    // Start generating random trays.
    for (let index = 0; index < traysGenerated; index++) {

      // Random int generator. (Between 1-100)
      const rng = _.random(1, 100);
      
      // Generates an empty tray depending on whether the rng value is less than...
      if(rng <= 5 * (traysGenerated - index)){
        printer.trays.push(new Tray(`Tray ${index + 1}`, 2, 'Letter'));
        emptyGenerated++;
      }
      else {
        printer.trays.push(new Tray(`Tray ${index +1}`, 0, 'Letter'));
        fullGenerated++;
      }

    }

    if(fullGenerated > 1){
      printer.printerStatus = 0;
    }
    else if(fullGenerated === 1){
      printer.printerStatus = 1;
    }
    else {
      printer.printerStatus = 2;
    }

    printer.tonerStatus = _.random(1, 100);
    printer.drumStatus = _.random(1, 100);
    printer.maintKitStatus = _.random(1, 100);
    printer.statusMessage = 'Test Data...'
    printer.pagesPrinted = _.random(1000000, 2500000);
    
    return printer;

  }

}

export class Tray {

  constructor(name, statusCode, setting){
    this.name = name;
    this.statusCode = statusCode;
    this.setting = setting;
  }

  trayStatus(){

    switch(this.statusCode){
      case 0: return 'Full';
      case 1: return 'Low';
      case 2: return 'Empty';
      default: return 'Missing';
    }

  }

}