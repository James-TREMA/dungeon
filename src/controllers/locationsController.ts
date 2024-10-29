import { Request, Response } from "express";
import { dataSource } from "../database";
import { Location } from "../entities/models/locations";

export class LocationsController {
    static async getAll(req: Request, res: Response) {
        try {
            const locationRepository = dataSource.getRepository(Location);
            const locations = await locationRepository.find();
            res.json(locations);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des emplacements", error });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const locationRepository = dataSource.getRepository(Location);
            const location = await locationRepository.findOneBy({ id: parseInt(req.params.id) });
            if (location) {
                res.json(location);
            } else {
                res.status(404).json({ message: "Emplacement non trouvé" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de l'emplacement", error });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const locationRepository = dataSource.getRepository(Location);
            const newLocation = locationRepository.create(req.body);
            await locationRepository.save(newLocation);
            res.status(201).json(newLocation);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de l'emplacement", error });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const locationRepository = dataSource.getRepository(Location);
            await locationRepository.update(req.params.id, req.body);
            const updatedLocation = await locationRepository.findOneBy({ id: parseInt(req.params.id) });
            if (updatedLocation) {
                res.json(updatedLocation);
            } else {
                res.status(404).json({ message: "Emplacement non trouvé pour la mise à jour" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'emplacement", error });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const locationRepository = dataSource.getRepository(Location);
            const result = await locationRepository.delete(req.params.id);
            if (result.affected) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "Emplacement non trouvé pour la suppression" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'emplacement", error });
        }
    }
}
