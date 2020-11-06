import { Router } from "express";
import SaleController from "../controllers/SaleController";
import { UserRole } from "../enum";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all sales
router.get(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN])],
  SaleController.listAll
);

//Get all user sales
router.get(
  "/me",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.SELLER])],
  SaleController.listMySale
);

//Get one sale
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole([UserRole.ADMIN])],
  SaleController.show
);

//Create a new Sale
router.post(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.SELLER])],
  SaleController.newSale
);

//Edit one Sale
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole([UserRole.ADMIN])],
  SaleController.editSale
);

//Delete one category
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole([UserRole.ADMIN])],
  SaleController.deleteSale
);

export default router;
