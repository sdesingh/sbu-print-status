import axios from 'axios';

export default class PrinterMeta {

  public static instance = new PrinterMeta();

  public data: any = null;

  public GetPrinterMeta() {

    axios.get(
      'http://crweb2.campus.stonybrook.edu:443/api/printers/meta',
      {responseType: 'json'}
    )
    .then(
      (response) => {
        PrinterMeta.instance.data = response.data;
      }
    )
    .catch(
      (err) => {
        console.log('Unable to fetch printer meta data');
      }
    )
  }


    private constructor() {
      this.GetPrinterMeta();
    }
}