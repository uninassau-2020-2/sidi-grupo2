import AsyncStorage from "@react-native-community/async-storage";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { IError } from "../interface";
import { store } from "./store";
import { logoutAction } from "./store/ducks/auth/actions";
// import { useAuth } from "../context/auth.context";
type IObjectErros = {
  [key: number]: string;
};

const objectErros: IObjectErros = {
  400: "Problemas com as propriedades enviadas.",
  401: "Usuário não autenticado.",
  402: "Usuário inadinplente.",
  403: "Usuário inativo.",
  404: "Dados não encontrados.",
  409: "Dados já cadastrados.",
  500: "Falha no servidor.",
  1001: "Falha ao contactar servidor. Verifique sua conexão.",
};

const api = axios.create({
  baseURL: "http://localhost:8081",
  // baseURL: "https://sidi-grupo2.herokuapp.com",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

async function logout() {
  store.dispatch(logoutAction());
}

const requestMiddleware = async (config: AxiosRequestConfig) => {
  const storagedToken = await AsyncStorage.getItem("@auth:token");
  const newConfig = config;
  if (storagedToken) {
    newConfig.headers.auth = storagedToken;
  }
  return newConfig;
};

const requestErrorMiddleware = (error: AxiosError) => {
  return Promise.reject(error);
};

api.interceptors.request.use(requestMiddleware, requestErrorMiddleware);

const responseErrorMiddleware = async (error: AxiosError) => {
  const { response, config } = error;
  const status = (response && response?.status) || 1001;
  const responseErrors = {
    errorStatus: status,
    errorMessage: objectErros[status],
  };

  if (status === 401 && config.url?.includes("/auth/login")) {
    const responseErrorsNotAuth: IError = {
      errorStatus: status,
      errorMessage: "Falha na autenticação, verifique seus dados.",
    };
    return { ...error, fail: true, responseErrors: responseErrorsNotAuth };
  }

  if (
    status === 401 &&
    config.url?.includes("usuario_unificado/trocar_senha")
  ) {
    return Promise.reject(responseErrors);
  }

  if (status === 404 && config.url?.includes("/auth")) {
    const responseErrorsNotAuth: IError = {
      errorStatus: status,
      errorMessage: "Falha na autenticação, verifique seus dados.",
    };
    return { ...error, fail: true, responseErrors: responseErrorsNotAuth };
  }

  if (status === 401) {
    console.log("Finish()");
    // logout();
  }
  /**
   * Trata erros da validação da regra de negócio
   */
  if (status === 400 && Array.isArray(response?.data)) {
    const errors = response?.data.map((item) => {
      return { property: item.property, constraints: item.constraints };
    });
    return Promise.reject({ ...responseErrors, errors: errors });
  }
  if (status !== 404 && status !== 500) {
    // store.dispatch({ type: "errors/API_ERROR", ...responseErrors });
  }

  return Promise.reject(responseErrors);
};

const responseMiddleware = (response: AxiosResponse<any>) => {
  return response.data;
};

api.interceptors.response.use(responseMiddleware, responseErrorMiddleware);

export enum RequestMethod {
  GET = "get",
  POST = "post",
}

export default api;
