import { Module } from "vuex";
import { DataState } from "./types";
import { RootState } from "../types";
import { mutations } from "./mutations";
import { actions } from "./actions";
import AppSettings from "@/model/AppSettings";

const state: DataState = {
  printers: {},
  groups: [],
  printerMeta: [],
  triggers: [],
  toRetrieve: [],
  settings: AppSettings.loadFromCookies(),

  isLoadingData: false,
  refreshRate: 1,
  tickerValue: 60
};

export const Data_State: Module<DataState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations
};
