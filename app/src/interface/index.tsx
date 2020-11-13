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

export interface IUsers {
  name: string;
  id: number;
  acessNivel: string;
}
