import { Router } from "express";
import { usersRouter } from "./api/users";
import { itemsRouter } from "./api/item";
import { chestsRouter } from "./api/chests";
import { dungeonsRouter } from "./api/dungeons";
import { locationsRouter } from "./api/locations";
import { regionsRouter } from "./api/regions";

export const router = Router();

router.use('/users', usersRouter);
router.use('/items', itemsRouter);
router.use('/chests', chestsRouter);
router.use('/dungeons', dungeonsRouter);
router.use('/locations', locationsRouter);
router.use('/regions', regionsRouter);
