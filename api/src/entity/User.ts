import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Length, IsNotEmpty, IsEmail } from "class-validator";
import { Exclude } from "class-transformer";
import * as bcrypt from "bcryptjs";
import { UserRole } from "../enum";
@Entity()
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  @Length(4, 200)
  name: string;

  @Column()
  @IsEmail()
  @Length(4, 200)
  email: string;

  @Column()
  @Length(4, 100)
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.SELLER })
  @IsNotEmpty()
  role: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @DeleteDateColumn()
  @Exclude()
  deletedAt?: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
