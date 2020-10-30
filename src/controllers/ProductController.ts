import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Product } from "../entity/Product";
import { User } from "../entity/User";
import { Category } from "../entity/Category";

class ProductController {
  static listAll = async (req: Request, res: Response) => {
    //Get products from database
    const productRepository = getRepository(Product);
    const products = await productRepository.find({
      relations: ["user", "category"],
    });

    //Send the products object
    res.json(products);
  };

  static showProduct = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = parseInt(req.params.id);

    const categoryRepository = getRepository(Product);
    try {
      const category = await categoryRepository.findOneOrFail(id, {
        relations: ["user"],
      });
      res.json(category);
    } catch (error) {
      res.status(404).json({ data: "categoria não encontrada" });
    }
  };

  static newProduct = async (req: Request, res: Response) => {
    //Get parameters from the body
    let {
      name,
      description,
      amount,
      sale_price,
      cost_price,
      measuredUnit,
      id_category,
    } = req.body;
    const user = new User();
    user.id = res.locals.jwtPayload.userId;

    const category = new Category();
    category.id = id_category;

    let product = new Product();
    product.name = name;
    product.description = description;
    product.user = user;
    product.amount = parseInt(amount);
    product.sale_price = sale_price;
    product.cost_price = cost_price;
    product.measured_unit = measuredUnit;
    product.category = category;

    //Validade if the parameters are ok
    const errors = await validate(product);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the product is already in use
    const categoryRepository = getRepository(Product);
    try {
      //If all ok, send 201 response
      const categoryCreate = await categoryRepository.save(product);
      res.status(201).json(categoryCreate);
    } catch (e) {
      res.status(409).json({ data: "produto já existe" });
      return;
    }
  };

  // static editCategory = async (req: Request, res: Response) => {
  //   //Get the ID from the url
  //   const id = req.params.id;

  //   //Get values from the body
  //   const { name, category_id } = req.body;

  //   //Try to find category on database
  //   const categoryRepository = getRepository(Category);
  //   let category;
  //   try {
  //     category = await categoryRepository.findOneOrFail(id);
  //   } catch (error) {
  //     //If not found, send a 404 response
  //     res.status(404).json({data: "categoria não encontrada"});
  //     return;
  //   }

  //   //Validate the new values on model
  //   category.name = name;
  //   category.id_category = category_id;
  //   const errors = await validate(category);
  //   if (errors.length > 0) {
  //     res.status(400).send(errors);
  //     return;
  //   }

  //   //Try to safe, if fails, that means username already in use
  //   try {
  //     await categoryRepository.save(category);
  //     //After all send a 204 (no content, but accepted) response
  //     res.status(204).send();
  //   } catch (e) {
  //     res.status(409).json({category: "categoria já existe"});
  //     return;
  //   }
  // };

  // static deleteCategory = async (req: Request, res: Response) => {
  //   //Get the ID from the url
  //   const id = req.params.id;

  //   const categoryRepository = getRepository(Category);
  //   let category: Category;
  //   try {
  //     category = await categoryRepository.findOneOrFail(id);
  //   } catch (error) {
  //     res.status(404).json({data:"categoria não encontrada"});
  //     return;
  //   }

  //   //After all send a 204 (no content, but accepted) response
  //   await categoryRepository.delete(id).then(remove =>{
  //     res.status(200).json(category);
  //   });
  // };
}

export default ProductController;
