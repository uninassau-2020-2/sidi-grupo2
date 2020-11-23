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
    
    const productsReturn = products.map((p: Product) => {
      return {
        id: p.id,
        name: p.name,
        description: p.description,
        amount: p.amount,
        salePrice: p.salePrice,
        costPrice: p.costPrice,
        measuredUnit: p.measuredUnit,
        active: p.active,
        barCorde: p.barCorde,
        brand: p.brand,
        user: p.user.name,
        category: p.category.name,
      }
    });

    //Send the products object
    res.json(productsReturn);
  };

  static showProduct = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = parseInt(req.params.id);

    const productRepository = getRepository(Product);
    try {
      const product = await productRepository.findOneOrFail(id, {
        relations: ["user", "category"],
      });

      const productsReturn = {
        id: product.id,
        name: product.name,
        description: product.description,
        amount: product.amount,
        salePrice: product.salePrice,
        costPrice: product.costPrice,
        measuredUnit: product.measuredUnit,
        active: product.active,
        barCorde: product.barCorde,
        brand: product.brand,
        user: product.user.name,
        category: product.category.name,
      };

      res.json(productsReturn);
    } catch (error) {
      res.status(404).json({ data: "produto não encontrado" });
    }
  };

  static newProduct = async (req: Request, res: Response) => {
    //Get parameters from the body
    let {
      name,
      description,
      amount,
      salePrice,
      costPrice,
      measuredUnit,
      categoryId,
      barCode,
      active = true,
      brand,
    } = req.body;

    let product = new Product();
    product.name = name;
    product.description = description;
    product.user = { id: res.locals.jwtPayload.userId, name: res.locals.jwtPayload.name } as User;
    product.amount = parseInt(amount);
    product.salePrice = salePrice;
    product.costPrice = costPrice;
    product.measuredUnit = measuredUnit;
    product.barCorde = barCode;
    product.brand = brand;
    product.active = active == "true";

    //Validade if the parameters are ok
    const errors = await validate(product);
    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }
    let category: Category;
    try {
      category = await getRepository(Category).findOneOrFail(categoryId);
    } catch (e) {
      return res.status(400).json({ data: "produto não encontrado" });
    }

    //Try to save. If fails, the product is already in use
    const productRepository = getRepository(Product);
    try {
      //If all ok, send 201 response
      product.category = category;
      const productCreate = await productRepository.save(product);

      const productsReturn = {
        id: productCreate.id,
        name: productCreate.name,
        description: productCreate.description,
        amount: productCreate.amount,
        salePrice: productCreate.salePrice,
        costPrice: productCreate.costPrice,
        measuredUnit: productCreate.measuredUnit,
        active: productCreate.active,
        barCorde: productCreate.barCorde,
        brand: productCreate.brand,
        user: productCreate.user.name,
        category: productCreate.category.name,
      };

      res.status(201).json(productsReturn);
    } catch (e) {
      res.status(409).json({ data: "produto já existe" });
      return;
    }
  };

  static editProduct = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    let {
      name,
      description,
      amount,
      salePrice,
      costPrice,
      measuredUnit,
      categoryId,
      barCode,
      active = true,
      brand,
    } = req.body;

    //Try to find category on database
    const productRepository = getRepository(Product);
    let product;
    try {
      product = await productRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).json({ data: "produto não encontrado" });
      return;
    }

    //Validate the new values on model
    name && (product.name = name);
    description && (product.description = description);
    amount && (product.amount = parseInt(amount));
    salePrice && (product.salePrice = salePrice);
    costPrice && (product.costPrice = costPrice);
    measuredUnit && (product.measuredUnit = measuredUnit);
    barCode && (product.barCorde = barCode);
    brand && (product.brand = brand);
    active && (product.active = active == "true");

    const errors = await validate(product);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    let category: Category;
    try {
      category = await getRepository(Category).findOneOrFail(categoryId);
    } catch (e) {
      return res.status(400).json({ data: "categoria não encontrada" });
    }

    try {
      //If all ok, send 201 response
      product.category = category;
      const productCreate = await productRepository.save(product);

      const productsReturn = {
        id: productCreate.id,
        name: productCreate.name,
        description: productCreate.description,
        amount: productCreate.amount,
        salePrice: productCreate.salePrice,
        costPrice: productCreate.costPrice,
        measuredUnit: productCreate.measuredUnit,
        active: productCreate.active,
        barCorde: productCreate.barCorde,
        brand: productCreate.brand,
        category: productCreate.category.name,
      };

      res.json(productsReturn);
    } catch (e) {
      console.log(e);
      res.status(409).json({ data: e.message });
      return;
    }
  };

  static deleteProduct = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const productRepository = getRepository(Product);
    let product: Product;
    try {
      product = await productRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).json({ data: "produto não encontrado" });
      return;
    }

    //After all send a 204 (no content, but accepted) response
    await productRepository.delete(id).then((remove) => {
      res.status(200).json(product);
    });
  };
}

export default ProductController;
