import { ActionTree } from "vuex";
import { DataState } from "./types";
import { mutate } from "./mutations";
import { RootState } from "../types";
import axios, { AxiosInstance } from "axios";
import Printer from "@/model/Printers/Printer";
import Group from "@/model/Locations/Group";
import AppSettings from "@/model/AppSettings";

const api: AxiosInstance = axios.create({
  baseURL: "http://crweb2.campus.stonybrook.edu:443/api/",
  timeout: 10000,
  responseType: "json"
});

export const actions: ActionTree<DataState, RootState> = {
  fetchGroupMetaData({ commit }) {
    commit(mutate.IS_LOADING, true);

    api
      .get("/printers/groupmeta")
      .then(response => {
        const data = response.data;
        const groups: Group[] = [];
        data.forEach((json: any) => groups.push(Group.ParseFromJSON(json)));

        commit(mutate.GROUP_META, groups);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => commit(mutate.IS_LOADING, false));
  },

  /**
   * Fetch data for printers specified.
   * @param ActionContext Context to commit changes.
   */
  fetchData({ commit, state }) {
    state.toRetrieve.forEach((id: number) => {
      api
        .get(`/printers/${id}`)
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

  init({ commit, state, dispatch }) {
    commit(mutate.LOAD_SETTINGS, AppSettings.loadFromCookies());
    dispatch("fetchGroupMetaData");

    setInterval(() => {
      commit(mutate.DECREMENT_TICKER);

      if (state.tickerValue == 0) {
        commit(mutate.RESET_TICKER);
        dispatch("fetchData");
      }
    }, 1000);
  }
};
