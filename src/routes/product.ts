import { IsEnum } from "class-validator";
import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import ProductController from "../controllers/ProductController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";
import { UserRole } from "../enum";

const router = Router();

//Get all categories
router.get(
  "/",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.SELLER])],
  ProductController.listAll
);

//Get one category
router.get(
  "/:id([0-9]+)",
  [checkJwt, checkRole([UserRole.ADMIN, UserRole.SELLER])],
  ProductController.showProduct
);

//Create a new category
router.post(
  "/",
  [
    checkJwt,
    checkRole([UserRole.ADMIN]),
    // celebrate({
    //   body: Joi.object().keys({
    //     name: Joi.string().required(),
    //     description: Joi.string().required(),
    //     sale_price: Joi.number().precision(2).required(),
    //     cost_price: Joi.number().precision(2).required(),
    //     measured_unit: Joi.valid(MeasuredUnit).required(),
    //     category: Joi.number().integer().required(),
    //   })
    // })
  ],
  ProductController.newProduct
);

// //Edit one category
// router.patch(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["ADMIN", "SELLER"])],
//   CategoryController.editCategory
// );

// //Delete one category
// router.delete(
//   "/:id([0-9]+)",
//   [checkJwt, checkRole(["ADMIN"])],
//   CategoryController.deleteCategory
// );

export default router;
