import "reflect-metadata";
import { dataSource } from './database/ConfigDB';
import { runSeed } from './database/seeds/seed';
import { router } from './routes';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use('/api', router);

// Configuration CORS pour autoriser les requêtes depuis localhost:4200
app.use(cors({
  origin: 'http://localhost:4200'
}));

dataSource.initialize()
    .then(() => {
        console.log("La source de données a été initialisée !");
        return runSeed();  // Exécuter le seed après l'initialisation de la source de données
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Serveur fonctionnant sur le port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Erreur lors de l'initialisation de la source de données", err);
    });