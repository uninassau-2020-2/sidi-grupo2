import React from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useAuth } from "../context/auth.context";

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
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

const responseErrorMiddleware = async (error: AxiosError) => {
  const { response, config } = error;
  const { signOut } = useAuth();

  const status = (response && response.status) || 1001;

  const responseErrors = {
    errorStatus: status,
    errorMessage: objectErros[status],
  };

  if (status === 401 && config.url?.includes("/login")) {
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
    signOut();
  }

  if (status !== 404 && status !== 500) {
    // store.dispatch({ type: "errors/API_ERROR", ...responseErrors });
  }

  return Promise.reject(responseErrors);
};

interface IError {
  errorStatus: number;
  errorMessage: string;
}

const responseMiddleware = (response: AxiosResponse<any>) => {
  return response.data;
};

api.interceptors.response.use(responseMiddleware, responseErrorMiddleware);

export enum RequestMethod {
  GET = "get",
  POST = "post",
}

export default api;
