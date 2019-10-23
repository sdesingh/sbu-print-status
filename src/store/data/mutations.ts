import { MutationTree } from "vuex";
import { DataState } from "./types";
import Printer from "@/model/Printers/Printer";
import Group from "@/model/Locations/Group";
import AppSettings from "@/model/AppSettings";
import Vue from "vue";

export const mutate = {
  PRINTER_DATA: "newPrinterData",
  RESET_PRINTER_DATA: "resetPrinterData",
  PRINTERS_TO_RETRIEVE: "toRetrieve",
  IS_LOADING: "isLoading",
  GROUP_META: "groupMetaData",
  DECREMENT_TICKER: "decrementTicker",
  RESET_TICKER: "resetTicker",
  LOAD_SETTINGS: "loadSettings"
};

export const mutations: MutationTree<DataState> = {
  [mutate.PRINTER_DATA](state, printer: Printer) {
    Vue.set(state.printers, printer.id, printer);
  },

  [mutate.RESET_PRINTER_DATA](state) {
    state.printers = {};
  },

  [mutate.IS_LOADING](state, isLoading: boolean) {
    state.isLoadingData = isLoading;
  },

  [mutate.GROUP_META](state, groups: Group[]) {
    state.groups = groups;
  },

  [mutate.DECREMENT_TICKER](state) {
    state.tickerValue -= 1;
  },

  [mutate.RESET_TICKER](state) {
    state.tickerValue = 60;
  },

  [mutate.PRINTERS_TO_RETRIEVE](state, printerIDs: number[]) {
    state.toRetrieve = printerIDs;
    state.settings.printersToRetrive = printerIDs;
    AppSettings.saveSettings(state.settings);
  },

  [mutate.LOAD_SETTINGS](state, settings: AppSettings) {
    state.refreshRate = settings.refreshRate;
    state.toRetrieve = settings.printersToRetrive;
  }
};
