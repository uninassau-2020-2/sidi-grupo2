import { Product } from "./Product";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
} from "typeorm";
import { Length } from "class-validator";
// import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["name"])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  categoryId: number;

  @Column()
  @Length(3, 100)
  name: string;

  @ManyToOne(() => Category, (project) => project.id)
  @JoinColumn({ name: "categoryId" })
  category?: Category;

  @OneToMany(() => Product, (product) => product.category, {
    cascade: ["soft-remove"],
    eager: true,
  })
  products: Product[];

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
