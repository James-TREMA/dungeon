import { Router } from "express";
import { RegionsController } from "../../controllers/regionsController";

export const regionsRouter = Router();

regionsRouter.get('/', RegionsController.getAll); // Route pour récupérer toutes les régions
regionsRouter.get('/:id', RegionsController.getById); // Route pour récupérer une région par ID
regionsRouter.post('/', RegionsController.create); // Route pour créer une nouvelle région
regionsRouter.put('/:id', RegionsController.update); // Route pour mettre à jour une région
regionsRouter.delete('/:id', RegionsController.delete); // Route pour supprimer une région
