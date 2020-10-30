import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Length, IsEnum, IsDecimal, IsNotEmpty } from "class-validator";
import { Category } from "./Category";
import { User } from "./User";

export enum MeasuredUnit {
  GRAMS = "grams",
  MILLILITRES = "millilitres",
  KILOGRAM = "kilogram",
  LITRE = "litre",
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 100)
  name: string;

  @Column()
  @Length(3, 200)
  description: string;

  @Column({ default: 0 })
  amount: number;

  @Column("decimal", { precision: 5, scale: 2 })
  @IsDecimal({ decimal_digits: "0,2" })
  sale_price: string;

  @Column("decimal", { precision: 5, scale: 2 })
  @IsDecimal({ decimal_digits: "0,2" })
  cost_price: string;

  @Column({ type: "enum", enum: MeasuredUnit, default: MeasuredUnit.GRAMS })
  @IsEnum(MeasuredUnit)
  measured_unit: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Category, (category) => category.products)
  @IsNotEmpty()
  category: Category;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
