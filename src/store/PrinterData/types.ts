import Printer from '../../model/Printer/Printer';

export interface PrinterDataState {
  printers: Printer[];
  loadingData: boolean;
}