import { Router } from 'express';
import { UsersController } from '../../controllers/usersController';

const router = Router();

// Récupérer tous les utilisateurs
router.get('/', (req, res) => UsersController.getAll(req, res));

// Récupérer un utilisateur par ID
router.get('/:id', (req, res) => UsersController.getById(req, res));

// Créer un nouvel utilisateur
router.post('/', (req, res) => UsersController.create(req, res));

// Mettre à jour les attributs simples d'un utilisateur (rank, gold, health, energy, role)
router.put('/:id/attributes', (req, res) => UsersController.updateUserAttributes(req, res));

// Ajouter un item dans l'inventaire d'un utilisateur
router.post('/:id/inventory', (req, res) => UsersController.addItemToInventory(req, res));

// Ajouter un ami à la liste d'amis d'un utilisateur
router.post('/:id/friends', (req, res) => UsersController.addFriend(req, res));

// Ajouter un achievement à un utilisateur
router.post('/:id/achievements', (req, res) => UsersController.addAchievement(req, res));

// Mettre à jour tous les attributs d'un utilisateur, y compris l'inventaire, les amis et les succès
router.put('/:id', (req, res) => UsersController.updateUser(req, res));

// Supprimer un utilisateur par ID
router.delete('/:id', (req, res) => UsersController.delete(req, res));

export default router;
