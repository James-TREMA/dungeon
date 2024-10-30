import { Request, Response } from "express";
import { dataSource } from "../database/ConfigDB";
import { Dungeon } from "../entities/models/dungeons";

export class DungeonsController {
    static async getAll(req: Request, res: Response) {
        try {
            const dungeonRepository = dataSource.getRepository(Dungeon);
            const dungeons = await dungeonRepository.find();
            res.json(dungeons);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des donjons", error });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const dungeonRepository = dataSource.getRepository(Dungeon);
            const dungeon = await dungeonRepository.findOneBy({ id: parseInt(req.params.id) });
            if (dungeon) {
                res.json(dungeon);
            } else {
                res.status(404).json({ message: "Donjon non trouvé" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération du donjon", error });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const dungeonRepository = dataSource.getRepository(Dungeon);
            const newDungeon = dungeonRepository.create(req.body);
            await dungeonRepository.save(newDungeon);
            res.status(201).json(newDungeon);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du donjon", error });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const dungeonRepository = dataSource.getRepository(Dungeon);
            await dungeonRepository.update(req.params.id, req.body);
            const updatedDungeon = await dungeonRepository.findOneBy({ id: parseInt(req.params.id) });
            if (updatedDungeon) {
                res.json(updatedDungeon);
            } else {
                res.status(404).json({ message: "Donjon non trouvé pour la mise à jour" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour du donjon", error });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const dungeonRepository = dataSource.getRepository(Dungeon);
            const result = await dungeonRepository.delete(req.params.id);
            if (result.affected) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "Donjon non trouvé pour la suppression" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression du donjon", error });
        }
    }
}