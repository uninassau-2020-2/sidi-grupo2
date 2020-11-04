import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import category from "./category";
import product from "./product";
import provider from "./provider";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/category", category);
routes.use("/product", product);
routes.use("/provider", provider);

export default routes;
