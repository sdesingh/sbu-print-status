import { MutationTree, Module } from 'vuex';
import { UIState, RootState } from './types';
import Cookie from 'js-cookie';

const state: UIState = {
  showNavDrawer: false,
  showPrinterSettings: false,
  showPrinterSelect: false,
  enableDarkMode: false,
};

const mutations: MutationTree<UIState> = {

  setNavDrawer(state, show: boolean) {
    state.showNavDrawer = show;
  },

  setDarkMode(state, enableDarkMode: boolean) {
    state.enableDarkMode = enableDarkMode;
    Cookie.set('darkMode', enableDarkMode.toString());
  },

  showPrinterSettings(state, show: boolean) {
    state.showPrinterSettings = show;
  },
  showPrinterSelect(state, show: boolean) {
    state.showPrinterSelect = show;
  },
  toggleNavDrawer(state) {
    state.showNavDrawer = !state.showNavDrawer;
  },

  init(state) {
    let darkMode = Cookie.get('darkMode');
    state.enableDarkMode = darkMode === 'true';
  }
};



export const UI: Module<UIState, RootState> = {
  namespaced: true,
  state,
  mutations,
};
