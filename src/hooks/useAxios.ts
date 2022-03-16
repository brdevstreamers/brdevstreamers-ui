import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../utils/config";
import { useCallback, useEffect } from "react";
import { useAuth } from "./useAuth";

const api = axios.create({
  baseURL: config.baseUrl,
});

export function useAxios() {
  const { token, authenticated, setAuthState } = useAuth();

  useEffect(() => {}, [token, authenticated, setAuthState]);

  const apiGet = useCallback(
    async <Response, Data = void>(endpoint: string, config?: AxiosRequestConfig<Data>) => {
      const { data } = await api.get<Response, AxiosResponse<Response, Data>, Data>(
        endpoint,
        config,
      );
      return data;
    },
    [],
  );

  return { apiGet };
}
