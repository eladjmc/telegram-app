import axios from "axios";

class Api {
  axios = axios.create({
    baseURL: "https://localhost:3001",
  });

  async get<T = any>(url: string) {
    return await this.axios.get<T>(url);
  }
  async post<T = any>(url: string,data:any) {
    return await this.axios.post<T>(url,data);
  }

  async delete<T = any>(url: string) {
    return await this.axios.delete<T>(url);
  }
  async put<T = any>(url: string,data:any) {
    return await this.axios.put<T>(url,data);
  }
}
const API = new Api();
export default API ;
