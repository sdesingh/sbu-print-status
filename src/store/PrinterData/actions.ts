import { ActionTree } from 'vuex';
import { PrinterDataState } from './types';
import { RootState } from '../types';
import axios, { AxiosInstance } from 'axios';
import Printer from '@/model/Printer/Printer';

const api: AxiosInstance = axios.create(
  {
    baseURL: 'http://crweb2.campus.stonybrook.edu:443/api/',
    timeout: 10000,
    responseType: 'json',
  },
);

export const actions: ActionTree<PrinterDataState, RootState> = {

  fetchData({ commit }): any {

    api.get('/printers')
      .then(
        (response) => {
          const data = response.data;
          const printers: Printer[] = [];

          data.forEach((json: any) => printers.push(Printer.FromJSON(json)) );

          commit('newData', printers);
        },
      )
      .catch(
        (error) => {
          console.log('Error: ' + error);
        },
      );
  },
};
