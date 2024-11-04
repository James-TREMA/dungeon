import { Router } from "express";
import { usersRouter } from "./api/users";
import { itemsRouter } from "./api/items";
import { chestsRouter } from "./api/chests";
import { dungeonsRouter } from "./api/dungeons";
import { locationsRouter } from "./api/location";
import { regionsRouter } from "./api/regions";
import { achievementsRouter } from "./api/achievements";

const router = Router();

router.use('/users', usersRouter);
router.use('/items', itemsRouter);
router.use('/chests', chestsRouter);
router.use('/dungeons', dungeonsRouter);
router.use('/locations', locationsRouter);
router.use('/regions', regionsRouter);
router.use('/achievements', achievementsRouter);

export { router };