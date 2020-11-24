import { ProviderRequest } from "./../interface/index";
import api from "./api";

export async function doGetProvider() {
  return api.get("/provider");
}

export async function doRemoveProvider(id: number) {
  return api.delete(`/provider/${id}`);
}

export async function doCreateProvider(provider: ProviderRequest) {
  return api.post("/provider", provider);
}

export async function doUpdateProvider(id: number, provider: ProviderRequest) {
  return api.patch(`/provider/${id}`, provider);
}
