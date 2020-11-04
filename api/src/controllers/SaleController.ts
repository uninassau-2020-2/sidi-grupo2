import { SaleToProduct } from "./../entity/SaleToProduct";
import { Product } from "./../entity/Product";
import { Sale } from "./../entity/Sale";
import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entity/User";

export default class SaleController {
  static listAll = async (req: Request, res: Response) => {
    //Get sales from database
    const saleRepository = getRepository(Sale);
    const sales = await saleRepository.find();

    //Send the sales object
    res.json(sales);
  };

  static show = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: number = parseInt(req.params.id);

    const saleRepository = getRepository(Sale);
    try {
      const sale = await saleRepository.findOneOrFail(id);
      res.json(sale);
    } catch (error) {
      res.status(404).json({ data: "venda não encontrada" });
    }
  };

  static newSale = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { formOfPayment, total, change, products } = req.body;
    const sale = new Sale();
    sale.formOfPayment = formOfPayment;
    sale.total = total;
    sale.change = change || 0;
    sale.user = { id: res.locals.jwtPayload.userId } as User;

    //Validade if the parameters are ok
    const errors = await validate(sale);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      interface IProduct {
        productId: string;
        amount: string;
      }

      await getManager().transaction(async (transactionalEntityManager) => {
        const newSale = await transactionalEntityManager
          .getRepository(Sale)
          .save(sale);
        const saleProduct: Array<SaleToProduct> = products.map(
          (product: IProduct) => {
            console.log("product", product);
            return {
              productId: parseInt(product.productId),
              saleId: newSale.id,
              amount: parseInt(product.amount) || 1,
            } as SaleToProduct;
          }
        );

        await transactionalEntityManager
          .getRepository(SaleToProduct)
          .save(saleProduct);
      });

      //If all ok, send 201 response
      res.status(201).json({ data: "deu certo" });
    } catch (e) {
      res.status(409).json({ data: "algum produto é inexistente" });
      return;
    }
  };

  static editSale = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { formOfPayment, total, change } = req.body;

    //Try to find category on database
    const saleRepository = getRepository(Sale);
    let sale: Sale;

    try {
      sale = await saleRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).json({ data: "venda não encontrada" });
      return;
    }

    //Validate the new values on model
    formOfPayment && (sale.formOfPayment = formOfPayment);
    total && (sale.total = total);
    change && (sale.change = change || 0);
    const errors = await validate(sale);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await saleRepository.save(sale);
      //After all send a 204 (no content, but accepted) response
      res.status(200).send(sale);
    } catch (e) {
      res.status(409).json({ data: "venda já existe" });
      return;
    }
  };

  static deleteSale = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    const saleRepository = getRepository(Sale);
    let sale: Sale;
    try {
      sale = await saleRepository.findOneOrFail(id);
    } catch (error) {
      console.log("error", error);
      res.status(404).json({ data: "venda não encontrada" });
      return;
    }

    //After all send a 204 (no content, but accepted) response
    saleRepository.softDelete(id).then(() => {
      res.status(200).json(sale);
    });
  };
}
