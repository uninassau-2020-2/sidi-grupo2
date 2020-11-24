import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
  OneToMany,
  Unique,
} from "typeorm";
import {
  IsInt,
  IsMobilePhone,
  IsPhoneNumber,
  IsUrl,
  Length,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import { User } from "./User";
import { Product } from "./Product";

@Entity()
@Unique(["stateRegistration", "companyName", "cnpj"])
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(14)
  cnpj: string;

  @Column({ length: 200 })
  @Length(3, 200)
  companyName: string;

  @Column({ length: 120 })
  @Length(3, 120)
  fantasyName: string;

  @Column()
  @Length(12)
  stateRegistration: string;

  @Column({ length: 150 })
  @Length(5, 150)
  email: string;

  @Column({ length: 150 })
  @IsUrl()
  site: string;

  @Column({ length: 8 })
  @Length(8)
  zipcode: string;

  @Column({ length: 150 })
  @Length(2, 150)
  street: string;

  @Column({ type: "int", width: 5 })
  @IsInt()
  @Min(1)
  @Max(9999)
  number: number;

  @Column({ length: 120 })
  @Length(2, 120)
  neighborhood: string;

  @Column({ length: 200 })
  @Length(3, 200)
  city: string;

  @Column()
  @Length(2)
  uf: string;

  @Column({ length: 20 })
  @IsPhoneNumber("pt-BR")
  phone: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @OneToMany(() => Product, (product) => product.provider)
  @ValidateNested()
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
