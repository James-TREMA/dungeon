import "reflect-metadata";
import { dataSource } from './database';
import { router } from './routes';
import express from 'express';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use('/api', router);

dataSource.initialize()
    .then(() => {
        console.log("La source de données a été initialisée !");
        app.listen(process.env.PORT, () => {
            console.log(`Serveur fonctionnant sur le port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Erreur lors de l'initialisation de la source de données", err);
    });
