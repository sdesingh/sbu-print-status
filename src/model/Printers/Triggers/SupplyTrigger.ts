import { Trigger } from './Trigger';
import {Severity } from '@/model/Severity';

export default class SupplyTrigger extends Trigger {

  public checkSeverity(): Severity {

    let max = Severity.NORMAL;

    this.printer.supplies.forEach(supply => {
      if(supply.needsReplacement()){
        max = Severity.URGENT;
      }
      else if(supply.isBelowThreshold()) {
        if(Severity.WARNING > max)
          max = Severity.WARNING;
      }
    });

    return max;
  }
  public createTriggerShortMessage(): string {
    return 'Supply Status...';
  }

}
