import { Request, Response } from "express";
import { dataSource } from "../database";
import { Item } from "../entities/models/items";

export class ItemsController {
    static async getAll(req: Request, res: Response) {
        const itemRepository = dataSource.getRepository(Item);
        const items = await itemRepository.find();
        res.json(items);
    }

    static async getById(req: Request, res: Response) {
        const itemRepository = dataSource.getRepository(Item);
        const item = await itemRepository.findOneBy({ id: parseInt(req.params.id) });
        if (item) res.json(item);
        else res.status(404).json({ message: "Item not found" });
    }

    static async create(req: Request, res: Response) {
        const itemRepository = dataSource.getRepository(Item);
        const newItem = itemRepository.create(req.body);
        await itemRepository.save(newItem);
        res.status(201).json(newItem);
    }

    static async update(req: Request, res: Response) {
        const itemRepository = dataSource.getRepository(Item);
        await itemRepository.update(req.params.id, req.body);
        const updatedItem = await itemRepository.findOneBy({ id: parseInt(req.params.id) });
        res.json(updatedItem);
    }

    static async delete(req: Request, res: Response) {
        const itemRepository = dataSource.getRepository(Item);
        await itemRepository.delete(req.params.id);
        res.status(204).send();
    }
}