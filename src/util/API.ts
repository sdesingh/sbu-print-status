import axios from "axios";

export const instance = axios.create({
  baseURL: "http://crweb2.campus.stonybrook.edu:443/api/",
  timeout: 10000,
  responseType: "json"
});

export const getGroupMeta = instance.get("/printers/groupmeta");

export const getPrinterMeta = instance.get(`/printers/meta`);

export const getPrinterById = (id: number) => instance.get(`/printers/${id}`);
