import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { AccidentEntity, UserEntity } from './';


@Entity({ name: 'user_accident' })
export class UserAccidentEntity {
  constructor(
    user: UserEntity,
    accident: AccidentEntity,
  ) {
    this.user = user;
    this.accident = accident;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.userAccidents)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => AccidentEntity, (accident: AccidentEntity) => accident.userAccidents)
  @JoinColumn({ name: 'accident_id' })
  accident: AccidentEntity;
}
