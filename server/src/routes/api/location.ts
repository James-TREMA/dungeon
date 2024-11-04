import { Router } from "express";
import { LocationsController } from "../../controllers/locationsController";

export const locationsRouter = Router();

locationsRouter.get('/', LocationsController.getAll); // Route pour récupérer tous les emplacements
locationsRouter.get('/:id', LocationsController.getById); // Route pour récupérer un emplacement par ID
locationsRouter.post('/', LocationsController.create); // Route pour créer un nouvel emplacement
locationsRouter.put('/:id', LocationsController.update); // Route pour mettre à jour un emplacement
locationsRouter.delete('/:id', LocationsController.delete); // Route pour supprimer un emplacement