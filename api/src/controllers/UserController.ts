import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";

class UserController {
  static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ["id", "name", "email", "role"], //We dont want to send the passwords on response
    });

    //Send the users object
    res.json(users);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = parseInt(req.params.id);

    //Get the user from database
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ["id", "name", "email", "role"], //We dont want to send the pass`word on response
      });
      res.json(user);
    } catch (error) {
      res.status(404).send({ data: "usuário não encontrado" });
    }
  };

  static newUser = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { name, email, password, role } = req.body;
    let user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = role;

    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    user.hashPassword();

    //Try to save. If fails, the email is already in use
    const userRepository = getRepository(User);
    let userx: User;
    try {
      userx = await userRepository.save(user);
    } catch (e) {
      res.status(409).json({ data: "e-mail já existente" });
      return;
    }

    const userReturn = {
      id: userx.id,
      name: userx.name,
      email: userx.email,
      role: userx.role,
    } as User;

    //If all ok, send 201 response
    res.status(201).json(userReturn);
  };

  static editUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { name, email, role, password } = req.body;

    //Try to find user on database
    const userRepository = getRepository(User);
    let user: User; 
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).json({ data: "usuário não encontrado" });
      return;
    }
    //Validate the new values on model
    name && (user.name = name);
    email && (user.email = email);
    password && (user.password = password);
    role && (user.role = role);

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    if (password) user.hashPassword();

    //Try to safe, if fails, that means username already in use
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send({ data: "e-mail de usuário já em uso" });
      return;
    }

    const userReturn = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
    } as User;

    //After all send a 204 (no content, but accepted) response
    res.status(200).json(userReturn);
  };

  static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send({ data: "usuário não encontrado" });
      return;
    }
    userRepository.softDelete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(200).json({ data: "Usuario deletado"});
  };
}

export default UserController;
