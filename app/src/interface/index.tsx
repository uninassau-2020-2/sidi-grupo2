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

export type CategoryType = {
  id: number;
  categoryId: number | null;
  name: string;
};

export interface IUsers {
  name: string;
  id: number;
  acessNivel: string;
}
