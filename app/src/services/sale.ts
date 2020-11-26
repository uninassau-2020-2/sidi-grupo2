import { ProductRequest, SaleRequest } from "./../interface/index";
import api from "./api";

export async function doGetSales() {
  return api.get("/product");
}

export async function doRemoveSale(id: number) {
  return api.delete(`/product/${id}`);
}

export async function doCreateSale(sale: SaleRequest) {
  return api.post("/sale", sale);
}

export async function doUpdateProduct(id: number, sale: SaleRequest) {
  return api.patch(`/sale/${id}`, sale);
}
