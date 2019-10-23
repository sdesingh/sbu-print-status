import Printer from "@/model/Printers/Printer";
import Group from "@/model/Locations/Group";
import { Trigger } from "@/model/Printers/Triggers/Trigger";
import AppSettings from "@/model/AppSettings";

export interface DataState {
  printers: { [key: number]: Printer };
  triggers: Trigger[];
  groups: Group[];
  toRetrieve: number[];
  settings: AppSettings;

  isLoadingData: boolean;
  refreshRate: number;
  tickerValue: number;
}