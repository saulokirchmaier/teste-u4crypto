import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { VehicleEntity } from '.';

enum RoleType {
  client = 'client',
  engaged = 'engaded',
}

@Entity({ name: 'user' })
export class UserEntity {
  constructor(
    fullName: string,
    email: string,
    address: string,
    role?: RoleType,
    active?: boolean,
    updatedAt?: Date,
    deletedAt?: Date,
    vehicle?: VehicleEntity,
  ) {
    this.fullName = fullName;
    this.email = email;
    this.address = address;
    this.role = role;
    this.active = active;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.vehicle = vehicle;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', nullable: false })
  fullName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ default: null, name: 'address' })
  address: string;

  @Column({ default: RoleType.client, enum: RoleType, type: 'enum' })
  role?: RoleType;

  @Column({ default: true })
  active?: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ default: null, type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ default: null, type: 'timestamp', name: 'deleted_at' })
  deletedAt?: Date;

  @OneToOne(() => VehicleEntity, (vehicle: VehicleEntity) => vehicle.user)
  @JoinColumn()
  vehicle: VehicleEntity;
}
