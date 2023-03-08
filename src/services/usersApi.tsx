import axios from "axios";

class Api {
  axios = axios.create({
    baseURL: "https://telegram-773aa-default-rtdb.europe-west1.firebasedatabase.app",
  });

  async get<T = any>(url: string) {
    return await this.axios.get<T>(url);
  }
}
const USERS_API = new Api();
export default USERS_API ;
