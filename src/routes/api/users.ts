import { Router } from 'express';
import { UsersController } from '../../controllers/usersController';

const router = Router();

// Récupérer tous les utilisateurs
router.get('/', UsersController.getAll);

// Récupérer un utilisateur par ID
router.get('/:id', UsersController.getById);

// Créer un nouvel utilisateur
router.post('/', UsersController.create);

// Mettre à jour les attributs spécifiques d'un utilisateur (rank, gold, health, energy, role)
router.put('/:id/attributes', UsersController.updateUserAttributes);

// Ajouter un item dans l'inventaire d'un utilisateur
router.post('/:id/inventory', UsersController.addItemToInventory);

// Ajouter un ami à la liste d'amis de l'utilisateur
router.post('/:id/friends', UsersController.addFriend);

// Ajouter un achievement à l'utilisateur
router.post('/:id/achievements', UsersController.addAchievement);

// Mettre à jour tous les attributs d'un utilisateur, y compris inventaire, amis, et succès
router.put('/:id', UsersController.updateUser);

// Supprimer un utilisateur par ID
router.delete('/:id', UsersController.delete);