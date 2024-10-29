import { Router } from "express";

export const chestsRouter = Router();

chestsRouter.get('/', async (req, res) => {
    // Logique pour récupérer les coffres de la base de données
    res.send("Liste des coffres"); // Remplace par la logique réelle
});
