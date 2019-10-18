import { Module } from 'vuex';
import { PrinterDataState } from './types';
import { RootState } from '../types';
import { mutations } from './mutations';
import { actions } from './actions';
import AppSettings from '@/model/AppSettings';


const state: PrinterDataState = {
  printers: {},
  triggers: [],
  groups: [],
  toRetrieve: [],
  settings: AppSettings.loadFromCookies(),
  printerMetaData: null,

  isLoadingData: false,
  refreshRate: 1,
  tickerValue: 60,
};

export const PrinterData: Module<PrinterDataState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};


