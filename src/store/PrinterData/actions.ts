import { ActionTree } from 'vuex';
import { PrinterDataState } from './types';
import { types } from './mutations';
import { RootState } from '../types';
import axios, { AxiosInstance } from 'axios';
import Printer from '@/model/Printers/Printer';
import Group from '@/model/Locations/Group';
import AppSettings from '@/model/AppSettings';
import PrinterMeta from '@/util/PrinterMeta';


const api: AxiosInstance = axios.create(
  {
    baseURL: 'http://crweb2.campus.stonybrook.edu:443/api/',
    // baseURL: 'http://localhost:443/api/',
    timeout: 10000,
    responseType: 'json',
  },
);

export const actions: ActionTree<PrinterDataState, RootState> = {

  fetchGroupMetaData({ commit }) {

    commit(types.IS_LOADING, true);

    api.get('/printers/groupmeta')
      .then(
        (response) => {
          const data = response.data;
          const groups: Group[] = [];
          data.forEach( (json: any) =>  groups.push(Group.ParseFromJSON(json)));

          commit(types.GROUP_META, groups);

        }
      )
      .catch((err) => {
          console.log(err);
        },
      )
      .finally(() => commit(types.IS_LOADING, false));
  },

  fetchPrinterMetaData({ commit }) {

    api.get('/printers/meta')
      .then(
        (response) => {
          const data = response.data;
          commit(types.PRINTER_META, data);
        }
      )
      .catch((err) => {
        console.log(err);
      })

  },

  /**
   * Fetch data for printers specified.
   * @param ActionContext Context to commit changes.
   */
  fetchData({ commit, state }) {

    state.toRetrieve.forEach((id: number) => {

      api.get(`/printers/${id}`)
        .then((response) => {

          const printer = Printer.FromJSON(response.data);
          commit(types.PRINTER_DATA, printer);

        })
        .catch((err) => {
          console.log(`Unable to retrieve data for Printer ID [${id}].`);
          console.log(`Error: ${err}`);
        });
    });

  },

  init({ commit, state, dispatch }) {

    commit(types.LOAD_SETTINGS, AppSettings.loadFromCookies());
    dispatch('fetchGroupMetaData');
    PrinterMeta.instance.GetPrinterMeta();

    setInterval(() => {
      commit(types.DECREMENT_TICKER)
      
      if(state.tickerValue == 0) {
        commit(types.RESET_TICKER);
        dispatch('fetchData');
      }
    
    }, 1000);

  },

};


