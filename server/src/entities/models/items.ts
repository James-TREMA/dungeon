import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Dungeon } from "./dungeons";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 255 })
    type!: string;

    @Column({ length: 255 })
    rarity!: string;

    @Column({ length: 255 })
    source!: string;

    @ManyToMany(() => Dungeon, (dungeon) => dungeon.items) // Relation ManyToMany avec Dungeon
    dungeons!: Dungeon[];
}