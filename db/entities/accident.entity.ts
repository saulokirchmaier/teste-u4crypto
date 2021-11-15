import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany
} from 'typeorm';
import { UserAccidentEntity } from './';


@Entity({ name: 'accident' })
export class AccidentEntity {
  constructor(
    description: string,
    updatedAt?: Date,
    deletedAt?: Date,
  ) {
    this.description = description;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ default: null, type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ default: null, type: 'timestamp', name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => UserAccidentEntity, (userAccidents: UserAccidentEntity) => userAccidents.accident)
  userAccidents: UserAccidentEntity[];
}
