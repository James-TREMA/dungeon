import { Request, Response } from "express";
import { dataSource } from "../database/ConfigDB";
import { Item } from "../entities/models/items";

export class ItemsController {
    // Récupérer tous les items
    static async getAll(req: Request, res: Response) {
        try {
            const itemRepository = dataSource.getRepository(Item);
            const items = await itemRepository.find();
            res.json(items);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération des items", error });
        }
    }

    // Récupérer un item par ID
    static async getById(req: Request, res: Response) {
        try {
            const itemRepository = dataSource.getRepository(Item);
            const item = await itemRepository.findOneBy({ id: parseInt(req.params.id) });
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ message: "Item non trouvé" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération de l'item", error });
        }
    }

    // Créer un nouvel item
    static async create(req: Request, res: Response) {
        try {
            const itemRepository = dataSource.getRepository(Item);
            const newItem = itemRepository.create(req.body);
            await itemRepository.save(newItem);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de l'item", error });
        }
    }

    // Mettre à jour un item existant
    static async update(req: Request, res: Response) {
        try {
            const itemRepository = dataSource.getRepository(Item);
            await itemRepository.update(req.params.id, req.body);
            const updatedItem = await itemRepository.findOneBy({ id: parseInt(req.params.id) });
            if (updatedItem) {
                res.json(updatedItem);
            } else {
                res.status(404).json({ message: "Item non trouvé pour la mise à jour" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'item", error });
        }
    }

    // Supprimer un item
    static async delete(req: Request, res: Response) {
        try {
            const itemRepository = dataSource.getRepository(Item);
            const result = await itemRepository.delete(req.params.id);
            if (result.affected) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: "Item non trouvé pour la suppression" });
            }
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression de l'item", error });
        }
    }
}