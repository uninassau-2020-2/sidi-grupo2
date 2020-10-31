import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
} from "typeorm";
import {
  Length,
  IsEnum,
  IsDecimal,
  ValidateNested,
  IsBoolean,
  Min,
  IsEmpty,
  IsBooleanString,
  ValidateIf,
  IsOptional,
} from "class-validator";
import { Category } from "./Category";
import { User } from "./User";
import { MeasuredUnit } from "../enum";

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
  barCorde: string;

  @Column()
  @Length(3, 200)
  brand: string;

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
