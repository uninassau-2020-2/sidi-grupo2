import { Sale } from "./Sale";
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity()
export class SaleToProduct {
  @Column({ primary: true })
  productId!: number;

  @Column({ primary: true })
  saleId!: number;

  @Column()
  amount!: number;

  @ManyToOne(() => Product, (product) => product.saleToProducts)
  product!: Product;

  @ManyToOne(() => Sale, (sale) => sale.saleToProducts)
  sale!: Sale;
}
