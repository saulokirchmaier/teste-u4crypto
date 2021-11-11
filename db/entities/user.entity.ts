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
  ) {
    this.fullName = fullName;
    this.email = email;
    this.address = address;
    this.role = role;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'full_name', nullable: false })
  fullName: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'address', nullable: false, unique: true })
  address: string;

  @Column({ default: RoleType.client, enum: RoleType, type: 'enum' })
  role?: RoleType;

  @Column({ default: true })
  active?: RoleType;

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
