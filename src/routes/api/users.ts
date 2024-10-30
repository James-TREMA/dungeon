import { Router } from "express";
import { UsersController } from "../../controllers/usersController";

export const usersRouter = Router();

// Route pour récupérer tous les utilisateurs
usersRouter.get('/', UsersController.getAll);

// Route pour récupérer un utilisateur par ID
usersRouter.get('/:id', UsersController.getById);

// Route pour créer un nouvel utilisateur
usersRouter.post('/', UsersController.create);

// Route pour mettre à jour les attributs d'un utilisateur
usersRouter.patch('/:id/attributes', UsersController.updateUserAttributes);

// Route pour ajouter un item dans l'inventaire de l'utilisateur
usersRouter.post('/:id/inventory', UsersController.addItemToInventory);

// Route pour ajouter un ami
usersRouter.post('/:id/friends', UsersController.addFriend);

// Route pour ajouter un achievement
usersRouter.post('/:id/achievements', UsersController.addAchievement);

// Route pour mettre à jour l'utilisateur (tous les attributs)
usersRouter.put('/:id', UsersController.updateUser);

// Route pour supprimer un utilisateur
usersRouter.delete('/:id', UsersController.delete);
