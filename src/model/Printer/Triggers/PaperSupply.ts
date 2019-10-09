import { Trigger } from './Trigger';
import { Severity } from '@/model/Severity';
import { TrayStatus } from '@/model/Printer/Tray';

export default class PaperSupplyTrigger extends Trigger {

  public checkSeverity(): Severity {

    let traysFull = 0;
    let traysLow = 0;
    let traysEmpty = 0;
    let traysUnknown = 0;

    this.printer.trays.forEach(

      (tray) => {
        switch(tray.status) {
          case TrayStatus.FULL: traysFull++;
          break;

          case TrayStatus.LOW: traysLow++;
          break;

          case TrayStatus.EMPTY: traysEmpty++;
          break;

          default: traysUnknown++;
          break;

        }
      }

    );

    if (traysFull + traysLow >= 2) {
      return Severity.NORMAL;
    } else if (traysFull + traysLow === 1) {
      return Severity.WARNING;
    } else {
      return Severity.URGENT;
    }
  }

  public createTriggerShortMessage(): string {
    throw new Error('Method not implemented.');
  }


}