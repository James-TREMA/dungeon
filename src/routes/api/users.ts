import { Router } from "express";
import { UsersController } from "../../controllers/usersController";

export const usersRouter = Router();

// Route pour récupérer tous les utilisateurs
usersRouter.get('/', UsersController.getAll);

// Route pour récupérer un utilisateur par ID
usersRouter.get('/:id', UsersController.getById);

// Route pour créer un nouvel utilisateur
usersRouter.post('/', UsersController.create);

// Route pour mettre à jour un utilisateur existant
usersRouter.put('/:id', UsersController.update);

// Route pour supprimer un utilisateur
usersRouter.delete('/:id', UsersController.delete);
