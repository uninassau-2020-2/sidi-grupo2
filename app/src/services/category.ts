import { CategoryRequest } from "./../interface/index";
import api from "./api";

export async function doGetCategories() {
  return api.get("/category");
}

export async function doRemoveCategory(id: number) {
  return api.delete(`/category/${id}`);
}

export async function doCreateCategory(category: CategoryRequest) {
  return api.post("/category", category);
}

export async function doUpdateCategory(id: number, category: CategoryRequest) {
  return api.post(`/category/${id}`, category);
}
