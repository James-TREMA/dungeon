import { Request, Response } from "express";
import { dataSource } from "../database/ConfigDB";
import { Chest } from "../entities/models/chests";

export class ChestsController {
    static async getAll(req: Request, res: Response) {
        try {
            const chestRepository = dataSource.getRepository(Chest);
            const chests = await chestRepository.find();
            res.json(chests);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des coffres", error });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const chestRepository = dataSource.getRepository(Chest);
            const chest = await chestRepository.findOneBy({ id: parseInt(req.params.id) });
            if (chest) {
                res.json(chest);
            } else {
                res.status(404).json({ message: "Coffre non trouvé" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération du coffre", error });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const chestRepository = dataSource.getRepository(Chest);
            const newChest = chestRepository.create(req.body);
            await chestRepository.save(newChest);
            res.status(201).json(newChest);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du coffre", error });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const chestRepository = dataSource.getRepository(Chest);
            await chestRepository.update(req.params.id, req.body);
            const updatedChest = await chestRepository.findOneBy({ id: parseInt(req.params.id) });
            if (updatedChest) {
                res.json(updatedChest);
            } else {
                res.status(404).json({ message: "Coffre non trouvé pour la mise à jour" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du coffre", error });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const chestRepository = dataSource.getRepository(Chest);
            const result = await chestRepository.delete(req.params.id);
            if (result.affected) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "Coffre non trouvé pour la suppression" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du coffre", error });
        }
    }
}