import { MutationTree } from "vuex";
import { UIState } from "./types";
import Cookie from "js-cookie";

export const mutate = {
  INIT: "init",
  SHOW_SETTINGS: "showSettings",
  SHOW_PRINTER_SELECT: "showPrinterSelect",
  SHOW_NAV_DRAWER: "showNavDrawer",
  SET_DARK_MODE: "darkMode",
  IS_LOADING: "isLoading"
};

export const mutations: MutationTree<UIState> = {
  [mutate.INIT](state) {
    let darkMode = Cookie.get("darkMode");
    state.enableDarkMode = darkMode === "true";
  },

  [mutate.SHOW_SETTINGS](state, show: boolean) {
    state.showPrinterSettings = show;
  },

  [mutate.SHOW_PRINTER_SELECT](state, show: boolean) {
    state.showPrinterSelect = show;
  },

  [mutate.SHOW_NAV_DRAWER](state, show: boolean) {
    state.showNavDrawer = show;
  },

  [mutate.SET_DARK_MODE](state, isEnabled: boolean) {
    state.enableDarkMode = isEnabled;
  }
};
