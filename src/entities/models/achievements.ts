import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './users';

@Entity('achievement')
export class Achievement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'int', default: 1 })
  difficultyLevel: number;

  @Column({ type: 'int', default: 100 })
  rewardPoints: number;

  @ManyToMany(() => User, (user) => user.achievements)
  users: User[];
}