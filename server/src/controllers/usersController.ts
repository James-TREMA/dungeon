import { Request, Response } from "express";
import { dataSource } from "../database/ConfigDB";
import { User } from "../entities/models/users";
import { Item } from "../entities/models/items";
import { Achievement } from "../entities/models/achievements";

export class UsersController {
    // Récupérer tous les utilisateurs
    static async getAll(req: Request, res: Response) {
        try {
            const userRepository = dataSource.getRepository(User);
            const users = await userRepository.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
        }
    }

    // Récupérer un utilisateur par ID
    static async getById(req: Request, res: Response) {
        try {
            const userRepository = dataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: { id: parseInt(req.params.id) },
                relations: ["inventory", "achievements", "friends"]
            });
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error });
        }
    }

    // Créer un nouvel utilisateur
    static async create(req: Request, res: Response) {
        try {
            const userRepository = dataSource.getRepository(User);
            const newUser = userRepository.create(req.body);
            await userRepository.save(newUser);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error });
        }
    }

    // Mettre à jour des attributs d'un utilisateur (rank, gold, health, energy, role)
    static async updateUserAttributes(req: Request, res: Response) {
        const { id } = req.params;
        const { rank, gold, health, energy, role } = req.body;
        const userRepository = dataSource.getRepository(User);

        try {
            const user = await userRepository.findOneBy({ id: parseInt(id) });
            if (user) {
                user.rank = rank ?? user.rank;
                user.gold = gold ?? user.gold;
                user.health = health ?? user.health;
                user.energy = energy ?? user.energy;
                user.role = role ?? user.role;

                await userRepository.save(user);
                return res.json(user);
            }
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de la mise à jour des attributs', error });
        }
    }

    // Ajouter un item dans l'inventaire d'un utilisateur
    static async addItemToInventory(req: Request, res: Response) {
        const { id } = req.params;
        const { itemId } = req.body;
        const userRepository = dataSource.getRepository(User);
        const itemRepository = dataSource.getRepository(Item);

        try {
            const user = await userRepository.findOne({ where: { id: parseInt(id) }, relations: ['inventory'] });
            const item = await itemRepository.findOneBy({ id: itemId });

            if (user && item) {
                user.inventory.push(item);
                await userRepository.save(user);
                return res.json(user);
            }
            return res.status(404).json({ message: 'Utilisateur ou item non trouvé' });
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de l’ajout de l’item dans l’inventaire', error });
        }
    }

    // Ajouter un ami
    static async addFriend(req: Request, res: Response) {
        const { id } = req.params;
        const { friendId } = req.body;
        const userRepository = dataSource.getRepository(User);

        try {
            const user = await userRepository.findOne({ where: { id: parseInt(id) }, relations: ['friends'] });
            const friend = await userRepository.findOneBy({ id: friendId });

            if (user && friend) {
                user.friends.push(friend);
                await userRepository.save(user);
                return res.json(user);
            }
            return res.status(404).json({ message: 'Utilisateur ou ami non trouvé' });
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de l’ajout de l’ami', error });
        }
    }

    // Ajouter un achievement à l’utilisateur
    static async addAchievement(req: Request, res: Response) {
        const { id } = req.params;
        const { achievementId } = req.body;
        const userRepository = dataSource.getRepository(User);
        const achievementRepository = dataSource.getRepository(Achievement);

        try {
            const user = await userRepository.findOne({ where: { id: parseInt(id) }, relations: ['achievements'] });
            const achievement = await achievementRepository.findOneBy({ id: achievementId });

            if (user && achievement) {
                user.achievements.push(achievement);
                await userRepository.save(user);
                return res.json(user);
            }
            return res.status(404).json({ message: 'Utilisateur ou succès non trouvé' });
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de l’ajout du succès', error });
        }
    }

    // Mettre à jour un utilisateur avec inventaire, achievements, amis et attributs
    static async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { rank, gold, health, energy, role, inventory, achievements, friends } = req.body;

        try {
            const userRepository = dataSource.getRepository(User);
            const user = await userRepository.findOne({
                where: { id: parseInt(id) },
                relations: ['inventory', 'achievements', 'friends']
            });

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }

            // Mise à jour des attributs simples
            user.rank = rank ?? user.rank;
            user.gold = gold ?? user.gold;
            user.health = health ?? user.health;
            user.energy = energy ?? user.energy;
            user.role = role ?? user.role;

            // Mise à jour de l'inventaire, des succès et des amis si fournis
            if (inventory) {
                const items = await dataSource.getRepository(Item).findByIds(inventory);
                user.inventory = items;
            }

            if (achievements) {
                const achievementsList = await dataSource.getRepository(Achievement).findByIds(achievements);
                user.achievements = achievementsList;
            }

            if (friends) {
                const friendsList = await userRepository.findByIds(friends);
                user.friends = friendsList;
            }

            // Sauvegarder les changements
            await userRepository.save(user);
            return res.json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Erreur lors de la mise à jour de l’utilisateur', error });
        }
    }

    // Supprimer un utilisateur par ID
    static async delete(req: Request, res: Response) {
        try {
            const userRepository = dataSource.getRepository(User);
            const result = await userRepository.delete(req.params.id);
            if (result.affected) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "Utilisateur non trouvé pour la suppression" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error });
        }
    }
}