import Printer from '@/model/Printers/Printer';
import Group from '@/model/Locations/Group';
import { Trigger } from '@/model/Printers/Triggers/Trigger';

export interface PrinterDataState {
  printers: {[key: number]: Printer};
  triggers: Trigger[];
  groups: Group[];
  toRetrieve: number[];

  isLoadingData: boolean;
  refreshRate: number;
  tickerValue: number;
}
