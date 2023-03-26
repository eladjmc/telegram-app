import axios, {
  AxiosInstance,
} from "axios";

class Api {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: "http://127.0.0.1:443/",
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

  async delete<T = any>(url: string) {
    return await this.axios.delete<T>(url);
  }

  async put<T = any>(url: string, data: any) {
    return await this.axios.put<T>(url, data);
  }
}

const API = new Api();
export default API;
