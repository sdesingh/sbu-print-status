import { ActionTree } from "vuex";
import { DataState } from "./types";
import { mutate } from "./mutations";
import { RootState } from "../types";
import * as api from "@/util/api.ts";
import Printer from "@/model/Printers/Printer";
import AppSettings from "@/model/AppSettings";
import Group from "@/model/Locations/Group";

export const action = {
  FETCH_DATA: "fetchData",
  FETCH_GROUPS: "fetchGroups",
  FETCH_META: "fetchMeta",
  INIT: "init"
};

export const actions: ActionTree<DataState, RootState> = {
  /**
   * Fetch data for printers specified.
   * @param ActionContext Context to commit changes.
   */
  [action.FETCH_DATA]({ commit, state }) {
    state.toRetrieve.forEach((id: number) => {
      api
        .getPrinterById(id)
        .then(response => {
          const printer = Printer.FromJSON(response.data);
          commit(mutate.PRINTER_DATA, printer);
        })
        .catch(err => {
          console.log(`Unable to retrieve data for Printer ID [${id}].`);
          console.log(`Error: ${err}`);
        });
    });
  },

  async [action.FETCH_GROUPS]({ state, commit }) {
    commit(mutate.IS_LOADING, true);

    let printerMetaReq = await api.getPrinterMeta;
    let printerMeta = printerMetaReq.data;
    commit(mutate.PRINTER_META, printerMeta);

    api.getGroupMeta
      .then(response => {
        const data = response.data;
        const groups: Group[] = [];
        data.forEach((json: any) =>
          groups.push(Group.ParseFromJSON(json, state.printerMeta))
        );

        commit(mutate.GROUP_META, groups);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => commit(mutate.IS_LOADING, false));
  },

  [action.FETCH_META]({ commit }) {
    api.getPrinterMeta
      .then(response => {
        commit(mutate.PRINTER_META, response.data);
      })
      .catch(err => console.log("Unable to retrieve printer meta data."));
  },

  [action.INIT]({ commit, state, dispatch }) {
    commit(mutate.LOAD_SETTINGS, AppSettings.loadFromCookies());
    dispatch(action.FETCH_GROUPS);
    dispatch(action.FETCH_DATA);

    setInterval(() => {
      commit(mutate.DECREMENT_TICKER);

      if (state.tickerValue == 0) {
        commit(mutate.RESET_TICKER);
        dispatch(action.FETCH_DATA);
      }
    }, 1000);
  }
};
