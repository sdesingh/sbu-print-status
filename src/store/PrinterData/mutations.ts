import { MutationTree } from 'vuex';
import { PrinterDataState } from './types';
import Printer from '@/model/Printers/Printer';
import Group from '@/model/Locations/Group';
import AppSettings from '@/model/AppSettings';
import Vue from 'vue';


export const types = {
  PRINTER_DATA: 'newPrinterData',
  RESET_PRINTER_DATA: 'resetPrinterData',
  PRINTERS_TO_RETRIEVE: 'toRetrieve',
  IS_LOADING: 'isLoading',
  GROUP_META: 'groupMetaData',
  PRINTER_META: 'printerMetaData',
  DECREMENT_TICKER: 'decrementTicker',
  RESET_TICKER: 'resetTicker',
  LOAD_SETTINGS: 'loadSettings',
};


export const mutations: MutationTree<PrinterDataState> = {

  [types.PRINTER_DATA](state, printer: Printer) {
    Vue.set(state.printers, printer.id, printer);
  },

  [types.RESET_PRINTER_DATA](state) {
    state.printers = {};
  },

  [types.IS_LOADING](state, isLoading: boolean) {
    state.isLoadingData = isLoading;
  },

  [types.GROUP_META](state, groups: Group[]) {
    state.groups = groups;
  },

  [types.PRINTER_META](state, metaData: any) {
    state.printers = metaData;
  },

  [types.DECREMENT_TICKER](state) {
    state.tickerValue -= 1;
  },

  [types.RESET_TICKER](state) {
    state.tickerValue = 60
  },

  [types.PRINTERS_TO_RETRIEVE](state, printerIDs: number[]) {
    state.toRetrieve = printerIDs;
    state.settings.printersToRetrive = printerIDs;
    AppSettings.saveSettings(state.settings);
  },

  [types.LOAD_SETTINGS](state, settings: AppSettings) {
    state.refreshRate = settings.refreshRate;
    state.toRetrieve = settings.printersToRetrive;
  }

};
