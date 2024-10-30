import { Request, Response } from "express";
import { dataSource } from "../database/ConfigDB";
import { User } from "../entities/models/users";

export class UsersController {
    static async getAll(req: Request, res: Response) {
        try {
            const userRepository = dataSource.getRepository(User);
            const users = await userRepository.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const userRepository = dataSource.getRepository(User);
            const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "Utilisateur non trouvé" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error });
        }
    }

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

    static async update(req: Request, res: Response) {
        try {
            const userRepository = dataSource.getRepository(User);
            await userRepository.update(req.params.id, req.body);
            const updatedUser = await userRepository.findOneBy({ id: parseInt(req.params.id) });
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ message: "Utilisateur non trouvé pour la mise à jour" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error });
        }
    }

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