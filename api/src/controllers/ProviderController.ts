import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Provider } from "./../entity/Provider";
import { User } from "../entity/User";

export default class ProviderController {
  static listAll = async (req: Request, res: Response) => {
    //Get providers from database
    const providerRepository = getRepository(Provider);
    const providers = await providerRepository.find();

    //Send the providers object
    res.json(providers);
  };

  static showProvider = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = parseInt(req.params.id);

    const providerRepository = getRepository(Provider);
    try {
      const provider = await providerRepository.findOneOrFail(id);
      res.json(provider);
    } catch (error) {
      res.status(404).json({ data: "fornecedor não encontrado" });
    }
  };

  static newProvider = async (req: Request, res: Response) => {
    //Get parameters from the body
    let {
      cnpj,
      companyName,
      fantasyName,
      stateRegistration,
      email,
      site,
      zipcode,
      street,
      number,
      neighborhood,
      city,
      uf,
      phone,
    } = req.body;

    let provider = new Provider();
    provider.user = { id: res.locals.jwtPayload.userId } as User;
    provider.cnpj = cnpj;
    provider.companyName = companyName;
    provider.fantasyName = fantasyName;
    provider.stateRegistration = stateRegistration;
    provider.zipcode = zipcode;
    provider.email = email;
    provider.site = site;
    provider.street = street;
    provider.number = parseInt(number);
    provider.neighborhood = neighborhood;
    provider.city = city;
    provider.uf = uf;
    provider.phone = phone;

    //Validade if the parameters are ok
    const errors = await validate(provider);
    if (errors.length > 0) {
      res.status(400).json(errors);
      return;
    }

    //Try to save. If fails, the provider is already in use
    const providerRepository = getRepository(Provider);
    try {
      //If all ok, send 201 response
      const categoryCreate = await providerRepository.save(provider);
      res.status(201).json(categoryCreate);
    } catch (e) {
      res.status(409).json({ data: "fornecedor já existe" });
      return;
    }
  };

  static editProvider = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    let {
      cnpj,
      companyName,
      fantasyName,
      stateRegistration,
      email,
      site,
      zipcode,
      street,
      number,
      neighborhood,
      city,
      uf,
      phone,
    } = req.body;

    //Try to find category on database
    const providerRepository = getRepository(Provider);
    let provider;
    try {
      provider = await providerRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).json({ data: "produto não encontrado" });
      return;
    }

    //Validate the new values on model
    cnpj && (provider.cnpj = cnpj);
    companyName && (provider.companyName = companyName);
    fantasyName && (provider.fantasyName = fantasyName);
    stateRegistration && (provider.stateRegistration = stateRegistration);
    email && (provider.email = email);
    site && (provider.site = site);
    zipcode && (provider.zipcode = zipcode);
    street && (provider.street = street);
    number && (provider.number = parseInt(number));
    neighborhood && (provider.neighborhood = neighborhood);
    city && (provider.city = city);
    uf && (provider.uf = uf);
    phone && (provider.phone = phone);

    const errors = await validate(provider);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      //If all ok, send 201 response
      const providerCreate = await providerRepository.save(provider);
      res.json(providerCreate);
    } catch (e) {
      res.status(409).json({ data: "produto já existe" });
      return;
    }
  };

  static deleteProvider = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const providerRepository = getRepository(Provider);
    let provider: Provider;
    try {
      provider = await providerRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).json({ data: "fornecedor não encontrado" });
      return;
    }

    //After all send a 204 (no content, but accepted) response
    await providerRepository.delete(id).then(() => {
      res.status(200).json(provider);
    });
  };
}
