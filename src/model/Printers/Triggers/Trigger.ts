import Printer from '../Printer';
import { Severity } from '@/model/Severity';

export abstract class Trigger {

  public readonly triggerName: string = 'Generic Trigger';
  public readonly printer: Printer;
  public readonly uid: string;

  constructor(printer: Printer) {
    this.printer = printer;
    this.uid = `${this.triggerName}-${printer.locationName}`;
  }

  public abstract checkSeverity(): Severity;

  public abstract createTriggerShortMessage(): string;

  public isTriggered(): boolean {
    return this.checkSeverity() > Severity.NORMAL;
  }

}
