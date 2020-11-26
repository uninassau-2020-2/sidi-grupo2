import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  OneToMany,
} from "typeorm";
import {
  Length,
  IsEnum,
  IsDecimal,
  ValidateNested,
  IsBoolean,
} from "class-validator";
import { Category } from "./Category";
import { User } from "./User";
import { Provider } from "./Provider";
import { MeasuredUnit } from "../enum";
import { SaleToProduct } from "./SaleToProduct";

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

  @Column({ default: 0, unsigned: true })
  amount: number;

  @Column("decimal", { precision: 5, scale: 2 })
  @IsDecimal({ decimal_digits: "0,2" })
  salePrice: string;

  @Column("decimal", { precision: 5, scale: 2 })
  @IsDecimal({ decimal_digits: "0,2" })
  costPrice: string;

  @Column({ type: "enum", enum: MeasuredUnit, default: MeasuredUnit.GR })
  @IsEnum(MeasuredUnit)
  measuredUnit: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Provider)
  provider: Provider;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
  })
  // @IsDefined({ message: "categoria não pode ficar vazia" })
  // @ValidateNested({ message: "categoria não pode ficar vazia" })
  @ValidateNested()
  category: Category;

  @Column({ default: true })
  @IsBoolean()
  active: Boolean;

  @Column()
  @Length(13, 15)
  barCode: string;

  @Column()
  @Length(3, 200)
  brand: string;

  @OneToMany(() => SaleToProduct, (saleToProduct) => saleToProduct.product)
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
