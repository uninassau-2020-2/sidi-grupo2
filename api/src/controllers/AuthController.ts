import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";
import config from "../config/config";
import { ErrorHandler } from "../helpers/ErrorHandler";
import { classToPlain } from "class-transformer";

class AuthController {
  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).json({ data: "campos incorretos" });
    }

    //Get user from database
    const userRepository = getRepository(User);
    let userx: User;
    try {
      userx = await userRepository.findOneOrFail({
        where: { username },
      });
    } catch (error) {
      res.status(401).json({ data: "usuário não encontrado" });
    }

    //Check if encrypted password match
    if (!userx.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).json({ data: "dados inválidos" });
      return;
    }

    const user = {
      id: userx.id,
      username: userx.username,
      role: userx.role,
    };

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    //Send the jwt in the response

    res.status(200).json({ user, token });
  };

  static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).json();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };
}
export default AuthController;
