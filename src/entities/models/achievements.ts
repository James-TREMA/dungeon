import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './users';

@Entity('achievement')
export class Achievement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  title!: string;

  @Column('text')
  description!: string;

  @Column({ type: 'int', default: 0 })
  points: number = 0;

  @ManyToMany(() => User, (user) => user.achievements, { cascade: true })
  users: User[] = [];
}