import { Router } from "express";

export const regionsRouter = Router();

regionsRouter.get('/', async (req, res) => {
    // Logique pour récupérer les régions de la base de données
    res.send("Liste des régions"); // Remplace par la logique réelle
});
