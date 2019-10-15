import { MutationTree } from 'vuex';
import { PrinterDataState } from './types';
import Printer from '@/model/Printers/Printer';
import Group from '@/model/Locations/Group';
import Vue from 'vue';


export const types = {
  PRINTER_DATA: 'newPrinterData',
  IS_LOADING: 'isLoading',
  GROUP_META: 'groupMetaData',
  DECREMENT_TICKER: 'decrementTicker',
};


export const mutations: MutationTree<PrinterDataState> = {

  [types.PRINTER_DATA](state, printer: Printer) {
    Vue.set(state.printers, printer.id, printer);

  },

  [types.IS_LOADING](state, isLoading: boolean) {
    state.isLoadingData = isLoading;
  },

  [types.GROUP_META](state, groups: Group[]) {
    state.groups = groups;
  },

  [types.DECREMENT_TICKER](state) {
    state.tickerValue -= 1;
    if( state.tickerValue === 0 ) {
      state.tickerValue = 60;
    }
  },
  

};
