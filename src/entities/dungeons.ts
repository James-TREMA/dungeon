import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dungeon {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 255 })
    entrance!: string;

    @Column("json")
    items!: object; // Liste des items dans le donjon

    @Column("json")
    chests!: object; // Liste des coffres dans le donjon

    @Column()
    level!: number;

    @Column({ length: 255 })
    location!: string;
}