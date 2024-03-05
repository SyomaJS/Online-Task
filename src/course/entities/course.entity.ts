import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { File } from '../../files/entities/file.entity';
import { User } from '../../user/entities/user.entity';

@Entity('course')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  course_name: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  duration: number;

  @ManyToMany(() => File, (file) => file.courses)
  files: File[];

  @ManyToMany(() => User, (user) => user.courses, { cascade: true })
  users: User[];
}
