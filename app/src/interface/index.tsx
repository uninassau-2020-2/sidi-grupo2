import { RoleUser } from "../enum";

export type Product = {
  id: number;
  name: string;
  description: string;
  amount: number;
  salePrice: number;
  costPrice: number;
  measuredUnit: string;
  category: string;
  active: number;
  barCorde: number;
};

export type ProductRequest = {
  name: string;
  description: string;
  amount: number;
  salePrice: number;
  costPrice: number;
  measuredUnit: string;
  category: string;
  active: number;
  barCorde: number;
};

export interface Category {
  id: number;
  categoryId: number | null;
  name: string;
}

export interface CategoryRequest {
  categoryId: number | null;
  name: string;
}
export interface IUsers {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Auth {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface UserRequest {
  name: string;
  email: string;
  password: string;
  role: RoleUser;
}

export interface Provider {
  id: number;
  cnpj: string;
  companyName: string;
  fantasyName: string;
  stateRegistration: string;
  zipcode: string;
  email: string;
  site: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  uf: string;
  phone: string;
}

export interface ProviderRequest {
  cnpj: string;
  companyName: string;
  fantasyName: string;
  stateRegistration: string;
  zipcode: string;
  email: string;
  site: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  uf: string;
  phone: string;
}

export interface IError {
  errorStatus: number;
  errorMessage: string;
}
