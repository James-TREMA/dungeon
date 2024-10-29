import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
