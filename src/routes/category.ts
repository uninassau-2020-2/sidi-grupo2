import { Router } from "express";
import CategoryController from "../controllers/CategoryController";
import { UserRole } from "../entity/User";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const router = Router();

//Get all categories
router.get("/", [checkJwt, checkRole([UserRole.ADMIN])], CategoryController.listAll);

//Get one category
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole([UserRole.ADMIN])],
  CategoryController.show
);

//Create a new category
router.post("/", [checkJwt, checkRole([UserRole.ADMIN])], CategoryController.newCategory);

//Edit one category
router.patch(
  "/:id([0-9]+)",
  [checkJwt, checkRole([UserRole.ADMIN])],
  CategoryController.editCategory
);

//Delete one category
router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole([UserRole.ADMIN])],
  CategoryController.deleteCategory
);

export default router;