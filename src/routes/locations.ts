import { Router } from "express";

export const locationsRouter = Router();

locationsRouter.get('/', async (req, res) => {
    // Logique pour récupérer les emplacements de la base de données
    res.send("Liste des emplacements"); // Remplace par la logique réelle
});
