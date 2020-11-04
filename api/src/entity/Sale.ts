import { FormOfPayment } from "./../enum/index";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import { IsDecimal, IsEnum } from "class-validator";
import { User } from "./User";
import { SaleToProduct } from "./SaleToProduct";
// import * as bcrypt from "bcryptjs";

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: FormOfPayment, default: FormOfPayment.CASH })
  @IsEnum(FormOfPayment)
  formOfPayment: string;

  @Column("decimal", { precision: 5, scale: 2 })
  @IsDecimal({ decimal_digits: "0,2" })
  total: string;

  @Column("decimal", { precision: 5, scale: 2, default: 0 })
  @IsDecimal({ decimal_digits: "0,2" })
  change: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @OneToMany(() => SaleToProduct, (saleToProduct) => saleToProduct.sale)
  saleToProducts!: SaleToProduct[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @DeleteDateColumn()
  deletedAt?: Date;
}
