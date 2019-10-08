import Vuex from 'vuex';
import { Module } from 'vuex';





export const UI: Module<any, any> = {
  namespaced: true,
  state: {
    showNavDrawer: false,
  },
  mutations: {
    setNavDrawer(state, show: boolean) {
      state.showNavDrawer = show;
    },
    toggleNavDrawer(state) {
      state.showNavDrawer = !state.showNavDrawer;
    },
  },
};
