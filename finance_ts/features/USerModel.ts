import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { Photo } from "./PhotoModel";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column("text")
  email!: string;

  @Column("text")
  names!: string;

  @Column("int")
  age!: number;

  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date;

  @DeleteDateColumn({ type: "datetime" })
  deletedAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => Photo, (photo) => photo.user, {
    nullable: true,
    cascade: true,
  })
  photo: any;
}
