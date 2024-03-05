import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Course } from '../../course/entities/course.entity';

interface IUserAttr {
  login: string;
  hashed_password: string;
}

@Entity()
@Unique(['login'])
export class User implements IUserAttr {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: false })
  login: string;

  @Column({ type: String, nullable: false })
  hashed_password: string;

  @ManyToMany(() => Course, (course) => course.users)
  @JoinTable()
  courses: Course[];
}
