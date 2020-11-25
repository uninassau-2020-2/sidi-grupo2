import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import category from "./category";
import product from "./product";
import provider from "./provider";
import sale from "./sale";
import me from "./me";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/category", category);
routes.use("/product", product);
routes.use("/provider", provider);
routes.use("/sale", sale);
routes.use("/me", me);

export default routes;
