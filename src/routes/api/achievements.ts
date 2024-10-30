import { Router } from 'express';
import { AchievementsController } from '../../controllers/achievementsController';

export const achievementsRouter = Router();

// Route pour récupérer tous les achievements
achievementsRouter.get('/', AchievementsController.getAll);

// Route pour récupérer un achievement par ID
achievementsRouter.get('/:id', AchievementsController.getById);

// Route pour créer un nouvel achievement
achievementsRouter.post('/', AchievementsController.create);

// Route pour mettre à jour un achievement
achievementsRouter.put('/:id', AchievementsController.update);

// Route pour supprimer un achievement
achievementsRouter.delete('/:id', AchievementsController.delete);