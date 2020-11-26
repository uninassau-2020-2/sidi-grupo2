import { FormOfPayment, RoleUser } from "../enum";

export type Product = {
  id: number;
  name: string;
  description: string;
  amount: number;
  salePrice: string;
  costPrice: string;
  measuredUnit: string;
  category: {
    id: number;
    name: string;
  };
  provider: {
    id: number;
    fantasyName: string;
  };
  active: boolean;
  barCode: string;
  brand: string;
};

export type ProductRequest = {
  name: string;
  description: string;
  amount: number;
  salePrice: string;
  costPrice: string;
  measuredUnit: string;
  categoryId: number;
  providerId: number;
  active: boolean;
  barCode: string;
  brand: string;
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
  number: number;
  neighborhood: string;
  city: string;
  uf: string;
  phone: string;
}

export interface SaleRequest {
  formOfPayment: FormOfPayment;
  total: string;
  change: string;
  products: Array<ProductCart>;
}

export interface ProductCart {
  productId: number;
  amount: number;
}
export interface IError {
  errorStatus: number;
  errorMessage: string;
  errors?: Array<{
    property: string;
    constraints: {};
  }> | null;
}
