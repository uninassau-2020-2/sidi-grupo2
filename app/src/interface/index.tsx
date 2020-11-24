import { RoleUser } from "../enum";

export type ProductType = {
  name: string;
  id: number;
  unitOfMeasurement: string;
  price: number;
  codigo: number;
  amount: number;
  purchasePrice: number;
  image: string;
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

export interface IError {
  errorStatus: number;
  errorMessage: string;
}
