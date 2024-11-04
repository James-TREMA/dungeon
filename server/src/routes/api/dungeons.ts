import { Router } from "express";
import { DungeonsController } from "../../controllers/DungeonsController";

export const dungeonsRouter = Router();

dungeonsRouter.get('/', DungeonsController.getAll); // Récupérer tous les donjons
dungeonsRouter.get('/:id', DungeonsController.getById); // Récupérer un donjon par ID
dungeonsRouter.post('/', DungeonsController.create); // Créer un nouveau donjon
dungeonsRouter.put('/:id', DungeonsController.update); // Mettre à jour un donjon existant
dungeonsRouter.delete('/:id', DungeonsController.delete); // Supprimer un donjon