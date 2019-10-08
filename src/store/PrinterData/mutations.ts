import { MutationTree } from 'vuex';
import { PrinterDataState } from './types';
import Printer from '@/model/Printer/Printer';

export const mutations: MutationTree<PrinterDataState> = {
  newData(state, printers: Printer[]) {
    state.printers = printers;
  },
};
