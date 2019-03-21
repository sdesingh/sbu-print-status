export class Printer {

  constructor(name, url, index, supplyThreshold){
    this.name = name;
    this.index = index;
    this.url = url;
    this.supplyThreshold = supplyThreshold;

    this.tonerStatus = 'Unknown';
    this.drumStatus = 'Unknown';
    this.maintKitStatus = 'Unknown';
    this.statusMessage = 'Unknown';

    this.printerStatus = 3;
    this.printerType = 0; // 0: Print from Anywhere, 1: RCC Lab

    this.trays = [];

  }

  tonerStatusCode(){
    let status = 0;

    const tonerStatus = this.tonerStatus;

    if(tonerStatus == 'Replace') { status = 2 }
    else{
      let pages = parseInt(tonerStatus.substring(0, tonerStatus.indexOf('-')))
  
      if(pages < this.supplyThreshold) {status = 1 }
    }

    return status;
  }

  drumStatusCode(){

    let status = 0;

    const drumStatus = this.drumStatus;

    if(drumStatus == 'Replace') { status = 2 }
    else{
      let pages = parseInt(drumStatus.substring(0, drumStatus.indexOf('-')))
  
      if(pages < this.supplyThreshold) {status = 1 }
    }

    return status;
    
  }

  maintKitStatusCode(){

    let status = 0;

    const maintKitStatus = this.maintKitStatus;

    if(maintKitStatus == 'Replace') { status = 2 }
    else{
      let pages = parseInt(maintKitStatus)
  
      if(pages < this.supplyThreshold) {status = 1 }
    }

    return status;

  }

  /**
   * Parses the json that is passed in and returns a new printer with the data.
   * @param {*} printerJSON JSON object with the printer data.
   * @param {*} printerName Name of the printer.
   * @param {*} printerIndex The index of the printer.
   * @param {*} printerUrl The url of the printer's web server.
   * @returns {Printer} A new printer object.
   */
  static ParsePrinterJSON(printerJSON, printerName, printerUrl, printerIndex, supplyThreshold) {

    let printer = new Printer(printerName, printerUrl, printerIndex, supplyThreshold);

    const traysJSON = printerJSON.Trays;

    // Parse printer trays.
    traysJSON.forEach(tray => {

      // Create a new tray.
      let newTray = new Tray(tray.TrayName, tray.TrayStatus, tray.TraySetting);

      // Add Tray to the newly created printer object.
      printer.trays.push(newTray);

    });

    // Set supply status.
    printer.tonerStatus = printerJSON.TonerStatus;
    printer.drumStatus = printerJSON.DrumStatus;
    printer.maintKitStatus = printerJSON.MaintKitStatus;

    // Set main printer status.
    printer.printerStatus = printerJSON.CurrentStatus;

    // Set printer status message.
    printer.statusMessage = printerJSON.StatusMessage;

    // Set printer type.
    printer.printerType = printerJSON.Type;

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
    }

  }

}