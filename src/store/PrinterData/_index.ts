import { Module } from 'vuex';
import { PrinterDataState } from './types';
import { RootState } from '../types';
import { mutations } from './mutations';
import { actions } from './actions';

const state: PrinterDataState = {
  printers: [],
  loadingData: false,
};

export const PrinterData: Module<PrinterDataState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};


