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
} from "typeorm";
import { Length } from "class-validator";
// import * as bcrypt from "bcryptjs";

@Entity()
@Unique(["name"])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  id_category: number;

  @Column()
  @Length(3, 100)
  name: string;

  @ManyToOne(() => Category, (project) => project.id)
  @JoinColumn({ name: "id_category" })
  category?: Category;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
