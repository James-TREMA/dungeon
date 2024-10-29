import { Router } from "express";
import { ItemsController } from "../../controllers/itemsController";

const itemsRouter = Router();

itemsRouter.get('/', ItemsController.getAll);
itemsRouter.get('/:id', ItemsController.getById);
itemsRouter.post('/', ItemsController.create);
itemsRouter.put('/:id', ItemsController.update);
itemsRouter.delete('/:id', ItemsController.delete);

export { itemsRouter };