import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Category } from "../entity/Category";

class CategoryController{

  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find({ relations: ["category"] });

    //Send the users object
    res.json(categories);
  };

  static show = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = parseInt(req.params.id);

    const categoryRepository = getRepository(Category);
    try {
      const category = await categoryRepository.findOneOrFail(id, {
        select: ["id", "name"],
        relations: ['category']
      });
      res.json(category);
    } catch (error) {
      res.status(404).json({data: "categoria não encontrada"});
    }
  };

  static newCategory = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { name, category_id } = req.body;
    let category = new Category();
    category.name = name;
    category.id_category = category_id;

    //Validade if the parameters are ok
    const errors = await validate(category);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the username is already in use
    const categoryRepository = getRepository(Category);
    try {
      //If all ok, send 201 response
      const categoryCreate = await categoryRepository.save(category);
      res.status(201).json(categoryCreate);
    } catch (e) {
      res.status(409).json({data: "categoria já existe"});
      return;
    }
  };

  static editCategory = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { name, category_id } = req.body;

    //Try to find category on database
    const categoryRepository = getRepository(Category);
    let category;
    try {
      category = await categoryRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).json({data: "categoria não encontrada"});
      return;
    }

    //Validate the new values on model
    category.name = name;
    category.id_category = category_id;
    const errors = await validate(category);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await categoryRepository.save(category);
      //After all send a 204 (no content, but accepted) response
      res.status(204).send();
    } catch (e) {
      res.status(409).json({category: "categoria já existe"});
      return;
    }
  };

  static deleteCategory = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;
 
    const categoryRepository = getRepository(Category);
    let category: Category;
    try {
      category = await categoryRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).json({data:"categoria não encontrada"});
      return;
    }

    //After all send a 204 (no content, but accepted) response
    await categoryRepository.delete(id).then(remove =>{
      res.status(200).json(category);
    });
  };
};

export default CategoryController;