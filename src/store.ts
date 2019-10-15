import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { UI } from './store/UI';
import { RootState } from './store/types';
import { PrinterData } from './store/PrinterData/PrinterData';

Vue.use(Vuex);


const store: StoreOptions<RootState> = {
  state: {
    version: '0.0.1',
    devMode: false,
  },
  modules: {
    ui: UI,
    data: PrinterData,
  },
};

export default new Vuex.Store<RootState>(store);
