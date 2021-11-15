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

export enum RoleType {
  client = 'client',
  engaged = 'engaded',
}

@Entity({ name: 'user' })
export class UserEntity {
  constructor(
    fullName: string,
    email: string,
    document: number,
    address: string,
    vehiclePlate: string,
    vehicleModel: string,
    // id?: number,
    role?: RoleType,
    active?: boolean,
    updatedAt?: Date,
    deletedAt?: Date,
  ) {
    this.fullName = fullName;
    this.email = email;
    this.document = document;
    this.address = address;
    this.role = role;
    this.vehiclePlate = vehiclePlate;
    this.vehicleModel = vehicleModel;
    // this.id = id;
    this.active = active;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'full_name', nullable: false })
  fullName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({nullable: false, unique: true })
  document: number;

  @Column({ default: null, name: 'address' })
  address: string;

  @Column({ default: RoleType.client, enum: RoleType, type: 'enum' })
  role?: RoleType;

  @Column({ name: 'vehicle_plate', unique: true })
  vehiclePlate: string;

  @Column({ name: 'vehicle_model' })
  vehicleModel: string;

  @Column({ default: true })
  active?: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ default: null, type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ default: null, type: 'timestamp', name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => UserAccidentEntity, (userAccidents: UserAccidentEntity) => userAccidents.user)
  userAccidents: UserAccidentEntity[];
}
