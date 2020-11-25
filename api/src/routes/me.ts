import { Router } from "express";
import MeController from "../controllers/MeController";
import { UserRole } from "../enum";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all sales
router.get(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN])],
  MeController.getGeneralData
);

export default router;
