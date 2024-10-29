import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chest {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 255 })
    name!: string;

    @Column({ length: 255 })
    location!: string;

    @Column("json")
    items!: object; // Utilisation de JSON pour stocker les objets contenus dans le coffre
}