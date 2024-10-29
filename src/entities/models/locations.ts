import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Dungeon } from "./dungeons";
import { Region } from "./regions";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @OneToMany(() => Dungeon, (dungeon) => dungeon.location) // Relation OneToMany avec Dungeon
    dungeons!: Dungeon[];

    @ManyToOne(() => Region, (region) => region.locations) // Relation ManyToOne avec Region
    region!: Region;
}
