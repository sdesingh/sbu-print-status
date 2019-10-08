import axios, { AxiosInstance } from 'axios';
import Printer from '@/model/Printer/Printer';


export default class API {


  public static async GetPrinters(callback: (printers: Printer[]) => any) {
    return this.instance.get('/printers')
      .then(
        (response) => {
          const data = response.data;
          const printers: Printer[] = [];

          data.forEach((json: any) => printers.push(Printer.FromJSON(json)) );

          callback(printers);
        },
      )
      .catch(
        (error) => {
          console.log('Error: ' + error);
        },
      );
  }

  private static readonly instance: AxiosInstance = axios.create(
    {
      baseURL: 'http://crweb2.campus.stonybrook.edu:443/api/',
      timeout: 10000,
      responseType: 'json',
    },
  );
}
