import { Router } from "express";
import { UsersController } from "../../controllers/usersController";

export const usersRouter = Router();

// Wrapper pour gérer les erreurs asynchrones
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: Function) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Route pour récupérer tous les utilisateurs
usersRouter.get('/', asyncHandler(UsersController.getAll));

// Route pour récupérer un utilisateur par ID
usersRouter.get('/:id', asyncHandler(UsersController.getById));

// Route pour créer un nouvel utilisateur
usersRouter.post('/', asyncHandler(UsersController.create));

// Route pour mettre à jour les attributs d'un utilisateur
usersRouter.patch('/:id/attributes', asyncHandler(UsersController.updateUserAttributes));

// Route pour ajouter un item dans l'inventaire de l'utilisateur
usersRouter.post('/:id/inventory', asyncHandler(UsersController.addItemToInventory));

// Route pour ajouter un ami
usersRouter.post('/:id/friends', asyncHandler(UsersController.addFriend));

// Route pour ajouter un achievement
usersRouter.post('/:id/achievements', asyncHandler(UsersController.addAchievement));

// Route pour mettre à jour l'utilisateur (tous les attributs)
usersRouter.put('/:id', asyncHandler(UsersController.updateUser));

// Route pour supprimer un utilisateur
usersRouter.delete('/:id', asyncHandler(UsersController.delete));
