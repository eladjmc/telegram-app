import axios, {
  AxiosInstance,
} from "axios";

class Api {
  axios: AxiosInstance;
  BACKEND_PATH = "/api"

  constructor() {
    const urlObject = new URL(window.location.href);
    const url = `${urlObject.protocol}//${urlObject.hostname}:5050`;

    this.axios = axios.create({
      baseURL: url + this.BACKEND_PATH,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json" ,
      },
    });
  }

  setToken(token: string) {
    this.axios.defaults.headers.common.Authorization = token;
  }

  removeToken() {
    delete this.axios.defaults.headers.common.Authorization;
  }

  async get<T = any>(url: string) {
    return await this.axios.get<T>(url);
  }

  async post<T = any>(url: string, data: any) {
    return await this.axios.post<T>(url, data);
  }

  async delete<T = any>(url: string, data: any) {
    return await this.axios.delete<T>(url, { data });
  }

  async put<T = any>(url: string, data: any) {
    return await this.axios.put<T>(url, data);
  }
}

const API = new Api();
export default API;
