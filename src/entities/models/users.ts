import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Location } from './location';
import { Dungeon } from './dungeons';
import { Item } from './items';
import { Achievement } from './achievements';

@Entity('user')
export class User {
  // Identifiant unique pour chaque utilisateur
  @PrimaryGeneratedColumn()
  id!: number;

  // Nom d'utilisateur unique
  @Column({ unique: true })
  username!: string;

  // Adresse email unique
  @Column({ unique: true })
  email!: string;

  // Mot de passe de l'utilisateur
  @Column()
  password!: string;

  // Niveau de l'utilisateur (défaut : 1)
  @Column({ type: 'int', default: 1 })
  rank: number = 1;

  // Quantité d'or détenue par l'utilisateur (défaut : 0)
  @Column({ type: 'int', default: 0 })
  gold: number = 0;

  // Inventaire de l'utilisateur - Relation Many-to-Many avec les objets (Items)
  @ManyToMany(() => Item, { cascade: true })
  @JoinTable({ name: 'user_inventory' })
  inventory!: Item[];

  // Succès de l'utilisateur - Relation Many-to-Many avec les succès (Achievements)
  @ManyToMany(() => Achievement, (achievement) => achievement.users, { cascade: true })
  @JoinTable({ name: 'user_achievements' })
  achievements!: Achievement[];

  // Liste d'amis de l'utilisateur - Relation Many-to-Many avec d'autres utilisateurs
  @ManyToMany(() => User, { cascade: true })
  @JoinTable({ name: 'user_friends' })
  friends!: User[];

  // Localisation actuelle de l'utilisateur - Relation Many-to-One avec Location
  @ManyToOne(() => Location, { nullable: true })
  @JoinColumn({ name: 'currentLocationId' })
  currentLocation?: Location;

  // Dernier donjon visité par l'utilisateur - Relation Many-to-One avec Dungeon
  @ManyToOne(() => Dungeon, { nullable: true })
  @JoinColumn({ name: 'lastDungeonId' })
  lastDungeon?: Dungeon;

  // Statistiques de l'utilisateur
  @Column({ type: 'int', default: 100 })
  health: number = 100;

  @Column({ type: 'int', default: 100 })
  energy: number = 100;

  // Compétences de l'utilisateur (tableau de chaînes de caractères)
  @Column("simple-array", { default: [] })
  skills!: string[];  
  
  // Rôle de l'utilisateur dans le jeu (défaut : 'adventurer')
  @Column({ type: 'varchar', length: 50, default: 'adventurer' })
  role: string = 'adventurer';
}