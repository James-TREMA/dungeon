import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Region {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column("text")
    description!: string; // Texte décrivant la région
}
