// src/routes/items.ts
import { Router } from "express";

export const itemsRouter = Router();

// Exemple d'une route GET pour récupérer tous les items
itemsRouter.get('/', async (req, res) => {
    // Logique pour récupérer les items de la base de données
    res.send("Liste des items"); // Remplace par la logique réelle
});

// Autres routes possibles (GET par ID, POST pour créer un item, etc.)