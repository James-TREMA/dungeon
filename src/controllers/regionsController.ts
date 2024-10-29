import { Request, Response } from "express";
import { dataSource } from "../database";
import { Region } from "../entities/models/regions";

export class RegionsController {
    static async getAll(req: Request, res: Response) {
        try {
            const regionRepository = dataSource.getRepository(Region);
            const regions = await regionRepository.find();
            res.json(regions);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des régions", error });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const regionRepository = dataSource.getRepository(Region);
            const region = await regionRepository.findOneBy({ id: parseInt(req.params.id) });
            if (region) {
                res.json(region);
            } else {
                res.status(404).json({ message: "Région non trouvée" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de la région", error });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const regionRepository = dataSource.getRepository(Region);
            const newRegion = regionRepository.create(req.body);
            await regionRepository.save(newRegion);
            res.status(201).json(newRegion);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de la région", error });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const regionRepository = dataSource.getRepository(Region);
            await regionRepository.update(req.params.id, req.body);
            const updatedRegion = await regionRepository.findOneBy({ id: parseInt(req.params.id) });
            if (updatedRegion) {
                res.json(updatedRegion);
            } else {
                res.status(404).json({ message: "Région non trouvée pour la mise à jour" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de la région", error });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const regionRepository = dataSource.getRepository(Region);
            const result = await regionRepository.delete(req.params.id);
            if (result.affected) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "Région non trouvée pour la suppression" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de la région", error });
        }
    }
}
