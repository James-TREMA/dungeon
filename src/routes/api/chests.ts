import { Router } from "express";
import { ChestsController } from "../../controllers/ChestsController";

export const chestsRouter = Router();

chestsRouter.get('/', ChestsController.getAll); // Route pour récupérer tous les coffres
chestsRouter.get('/:id', ChestsController.getById); // Route pour récupérer un coffre par ID
chestsRouter.post('/', ChestsController.create); // Route pour créer un nouveau coffre
chestsRouter.put('/:id', ChestsController.update); // Route pour mettre à jour un coffre existant
chestsRouter.delete('/:id', ChestsController.delete); // Route pour supprimer un coffre
