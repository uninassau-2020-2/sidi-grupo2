import { ProductRequest } from "./../interface/index";
import api from "./api";

export async function doGetProducts() {
  return api.get("/product");
}

export async function doRemoveProduct(id: number) {
  return api.delete(`/product/${id}`);
}

export async function doCreateProduct(product: ProductRequest) {
  return api.post("/product", product);
}

export async function doUpdateProduct(id: number, product: ProductRequest) {
  return api.post(`/product/${id}`, product);
}
