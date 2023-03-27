import {useState, useEffect} from "react";
import axios, {AxiosError, AxiosRequestConfig} from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:443/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  }
});

export enum Methods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

type UseAxiosProps<T = any> = {
  url: string;
  method: AxiosRequestConfig["method"];
  body?: any;
  token?: string;
};

type UseAxiosResult<T> = {
  data?: T;
  error?: AxiosError;
  loading: boolean;
};

function useAxios<T>({url, method, body, token}: UseAxiosProps<T>): UseAxiosResult<T> {

  const [data, setData] = useState<T>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = token ? {Authorization: token} : {};
        const options = body ? {method, data: body} : {method};
        const response = await axiosInstance(url, {...options, headers});
        setData(response.data);
      } catch (error: any) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url, method, body, token]);

  return {data, error, loading};
}

export default useAxios;
