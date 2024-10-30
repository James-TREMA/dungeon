import { DataSource } from "typeorm";
import { entities } from "../entities";

export const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    database: "Lestania",
    username: "postgres",
    password: "test123",
    logger: "advanced-console",
    synchronize: true,
    entities: entities
})