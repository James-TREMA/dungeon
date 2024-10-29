import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Location } from "./locations";

@Entity()
export class Region {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column("text")
    description!: string;

    @OneToMany(() => Location, (location) => location.region) // Relation OneToMany avec Location
    locations!: Location[];
    dungeons: any;
}