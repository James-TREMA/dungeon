import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Chest } from "./chests";
import { Item } from "./items";
import { Location } from "./location";
import { Region } from "./regions";

@Entity()
export class Dungeon {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 255 })
    entrance!: string;

    @Column()
    level!: number;

    @ManyToOne(() => Location, (location) => location.dungeons, { cascade: true }) // Relation ManyToOne avec Location
    location!: Location;

    @ManyToMany(() => Chest, { cascade: true }) // Relation ManyToMany avec Chest
    @JoinTable() // Nécessaire pour établir la table de jonction
    chests!: Chest[];

    @ManyToMany(() => Item, { cascade: true }) // Relation ManyToMany avec Item
    @JoinTable() // Nécessaire pour établir la table de jonction
    items!: Item[];

    @ManyToOne(() => Region, (region) => region.dungeons)
    region!: Region
}
