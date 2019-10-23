import { Module } from 'vuex';
import { DataState } from './types';
import { RootState } from '../types';
import { mutations } from './mutations';
import { actions } from './actions';
import AppSettings from '@/model/AppSettings';


const state: DataState = {
  printers: {},
  triggers: [],
  groups: [],
  toRetrieve: [0, 1, 2, 3, 4, 5, 6, 7, 17, 20],
  settings: AppSettings.loadFromCookies(),

  isLoadingData: false,
  refreshRate: 1,
  tickerValue: 60,
};

export const Data_State: Module<DataState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};

