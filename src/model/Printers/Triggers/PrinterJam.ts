import { Trigger } from './Trigger';
import { Severity } from '@/model/Severity';

export default class PrinterJam extends Trigger {
  public checkSeverity(): Severity {
    return this.printer.statusMessage.includes('Jam') ? Severity.URGENT : Severity.NORMAL;
  }
  public createTriggerShortMessage(): string {
    throw new Error('Method not implemented.');
  }

}
