import { MutationTree, Module } from 'vuex';
import { UIState, RootState } from './types';

const state: UIState = {
  showNavDrawer: false,
  showPrinterSettings: false,
};

const mutations: MutationTree<UIState> = {

  setNavDrawer(state, show: boolean) {
    state.showNavDrawer = show;
  },
  showPrinterSettings(state, show: boolean) {
    state.showPrinterSettings = show;
  },
  toggleNavDrawer(state) {
    state.showNavDrawer = !state.showNavDrawer;
  },
};



export const UI: Module<UIState, RootState> = {
  namespaced: true,
  state,
  mutations,
};
