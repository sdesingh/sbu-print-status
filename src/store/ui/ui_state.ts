import { mutations } from "./mutations";
import { UIState } from "./types";
import { RootState } from "../types";
import { Module } from "vuex";

const state: UIState = {
  showNavDrawer: false,
  showPrinterSettings: false,
  showPrinterSelect: false,
  enableDarkMode: false
};

export const UI_State: Module<UIState, RootState> = {
  namespaced: true,
  state,
  mutations
};
