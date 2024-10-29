import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Dungeon } from "./dungeons";

@Entity()
export class Chest {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 255 })
    location!: string;

    @ManyToMany(() => Dungeon, (dungeon) => dungeon.chests) // Relation ManyToMany avec Dungeon
    dungeons!: Dungeon[];
}