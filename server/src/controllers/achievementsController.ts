import { Request, Response } from 'express';
import { dataSource } from '../database/ConfigDB';
import { Achievement } from '../entities/models/achievements';

export class AchievementsController {
    // Récupérer tous les achievements
    static async getAll(req: Request, res: Response) {
        try {
            const achievements = await dataSource.getRepository(Achievement).find();
            res.json(achievements);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des achievements", error });
        }
    }

    // Récupérer un achievement par ID
    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const achievement = await dataSource.getRepository(Achievement).findOneBy({ id: parseInt(id, 10) });
            if (achievement) {
                res.json(achievement);
            } else {
                res.status(404).json({ message: "Achievement non trouvé" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de l'achievement", error });
        }
    }

    // Créer un nouvel achievement
    static async create(req: Request, res: Response) {
        try {
            const achievement = dataSource.getRepository(Achievement).create(req.body);
            const result = await dataSource.getRepository(Achievement).save(achievement);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de l'achievement", error });
        }
    }

    // Mettre à jour un achievement
    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const achievement = await dataSource.getRepository(Achievement).findOneBy({ id: parseInt(id, 10) });

            if (achievement) {
                dataSource.getRepository(Achievement).merge(achievement, req.body);
                const result = await dataSource.getRepository(Achievement).save(achievement);
                res.json(result);
            } else {
                res.status(404).json({ message: "Achievement non trouvé" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'achievement", error });
        }
    }

    // Supprimer un achievement
    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await dataSource.getRepository(Achievement).delete(id);
            if (result.affected) {
                res.json({ message: "Achievement supprimé" });
            } else {
                res.status(404).json({ message: "Achievement non trouvé" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'achievement", error });
        }
    }
}
