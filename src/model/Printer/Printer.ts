import { Supply } from './Supply';
import { Tray } from './Tray';
import { Trigger } from './Triggers/Trigger';
import { Severity } from '@/model/Severity';
import PrinterJam from './Triggers/PrinterJam';

export default class Printer {

  public static FromJSON(json: any): Printer {
    const _id = 'id';
    const _name = 'locationName';
    const _web = 'webServerURL';
    const _message = 'statusMessage';
    const _pageCount = 'pageCount';
    const _trays = 'trays';
    const _supplies = 'supplies';
    const _date = 'updatedAt';

    const id = json[_id];
    const name = json[_name];
    const web = json[_web];
    const message = json[_message];
    const date: string = Date.parse(json[_date]).toString();

    const printer = new Printer(id, name, message, web, date);

    const trays = json[_trays];
    const supplies = json[_supplies];

    Object.values(supplies).forEach( (supply: any) => printer.supplies.push(Supply.FromJSON(supply)) );

    trays.forEach( (tray: any) => printer.trays.push(Tray.ParseFromJSON(tray)) );

    printer.triggers.push(new PrinterJam(printer));

    return printer;

  }

  // Meta information.
  public id: number;
  public locationName: string;
  public statusMessage: string;
  public webServerURL: string;
  public updatedAt: string;

  // Supplies.
  public trays: Tray[];
  public supplies: Supply[];

  // Triggers.
  public triggers: Trigger[];


  constructor(id: number, name: string, message: string, url: string, date: string) {
    this.id = id;
    this.locationName = name;
    this.statusMessage = message;
    this.webServerURL = url;
    this.updatedAt = date;

    this.trays = [];
    this.supplies = [];
    this.triggers = [];
  }

  public checkPrinterStatus(): Severity {

    let max: Severity = Severity.NORMAL;

    this.triggers.forEach(
      (trigger) => {

        const severity = trigger.checkSeverity();

        if(severity > max) {
          max = severity;
        }
      }
    );

    return max;
  }

}
