import { Router } from "express";
import { usersRouter } from "./users";
import { itemsRouter } from "./item";

export const router = Router();

router.use('/users', usersRouter);
router.use('/items', itemsRouter);
