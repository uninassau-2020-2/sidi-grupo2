import { Router } from "express";
import ProviderController from "../controllers/ProviderController";
import { UserRole } from "../enum";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all providers
router.get(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN])],
  ProviderController.listAll
);

// Get one provider
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole([UserRole.ADMIN])],
  ProviderController.showProvider
);

//Create a new provider
router.post(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN])],
  ProviderController.newProvider
);

//Edit one provider
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole([UserRole.ADMIN])],
  ProviderController.editProvider
);

//Delete one provider
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole([UserRole.ADMIN])],
  ProviderController.deleteProvider
);

export default router;
