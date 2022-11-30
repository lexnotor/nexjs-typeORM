import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./USerModel";

@Entity("Photo")
export class Photo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("text")
  title!: string;

  @OneToOne(() => User, (user) => user.photo)
  @JoinColumn()
  user!: any;
}
