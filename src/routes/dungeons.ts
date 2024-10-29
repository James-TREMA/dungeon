import { Router } from "express";

export const dungeonsRouter = Router();

dungeonsRouter.get('/', async (req, res) => {
    // Logique pour récupérer les donjons de la base de données
    res.send("Liste des donjons"); // Remplace par la logique réelle
});
