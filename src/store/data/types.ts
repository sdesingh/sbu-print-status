import Printer from "@/model/Printers/Printer";
import { Trigger } from "@/model/Printers/Triggers/Trigger";
import AppSettings from "@/model/AppSettings";
import Group from "@/model/Locations/Group";

export interface DataState {
  printers: { [key: number]: Printer };
  groups: Group[];
  printerMeta: any[];
  triggers: Trigger[];
  toRetrieve: number[];
  settings: AppSettings;

  isLoadingData: boolean;
  refreshRate: number;
  tickerValue: number;
}
