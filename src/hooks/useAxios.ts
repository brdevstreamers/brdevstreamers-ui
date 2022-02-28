import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { endpoints } from "../service/api";

const api = axios.create({
  baseURL: endpoints.base.url,
});

export function useAxios() {
  const apiGet = async <Response, Data = void>(
    endpoint: string,
    config?: AxiosRequestConfig<Data>,
  ) => {
    const { data } = await api.get<
      Response,
      AxiosResponse<Response, Data>,
      Data
    >(endpoint, config);
    return data;
  };

  return { apiGet };
}
