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
import { UserEntity } from '.';

@Entity({name: 'vehicle'})
export class VehicleEntity {
  constructor(
    plate: string,
    model: string,
    userId: number,
  ) {
    this.plate = plate;
    this.model = model;
    this.userId = userId;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'plate', type: String,  nullable: false })
  plate: string;

  @Column({ name: 'model', type: String,})
  model: string;

  @Column({ name: 'user_id', type: Number })
  userId: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
  
  @UpdateDateColumn({ default: null, type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ default: null, type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.vehicle)
  @JoinColumn({ name: 'user_id'})
  user: UserEntity;
}
