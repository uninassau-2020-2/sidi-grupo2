import {Sale} from "../entity/Sale";
import {Request, Response} from "express";
import {getConnection} from "typeorm";

export default class MeController {
  static getGeneralData = async (req: Request, res: Response) => {
    let retorno = {
      mais_vendido_hoje: {
        id: 1,
        nome: 'Mel',
      },
      funcionario_do_dia: {
        id: 1,
        nome: 'João Devoto',
        valor: 1111111.00,
        quantidade_vendas: 30,
      }
    }


    console.log(new Date().toISOString().split('T')[0]);

    let produtoMaisVendido = await getConnection().query(`
      select p2.id, p2."name" AS nome, sum(stp.amount)::int as quantidade, sum(p2."costPrice" * stp.amount) AS valor_venda
      from "sale" s
      join sale_to_product stp on (stp."saleId" = s.id)
      join product p2 on (p2.id = stp."productId")
      where s."createdAt"::date = $1
      group by p2.id, stp."productId"
      order by sum(stp.amount) desc
      limit 1
`, [new Date().toISOString().split('T')[0]]);

    let funcionarioDoDia = await getConnection().query(`
    select u.id, u.name AS nome, sum(p."costPrice" * stp.amount) AS valor_venda, count(s.id)::int AS quantidade_vendas
    from "user" u
    join sale s on u.id = s."userId"
    join sale_to_product stp on s.id = stp."saleId"
    join product p on stp."productId" = p.id
    where s."createdAt"::date = $1
    group by u.id
    order by count(s.id) desc
    limit 1;
`, [new Date().toISOString().split('T')[0]]);

    retorno.mais_vendido_hoje = produtoMaisVendido.length > 0 ? produtoMaisVendido[0] : {};
    retorno.funcionario_do_dia = funcionarioDoDia.length > 0 ? funcionarioDoDia[0] : {};

    res.json(retorno);
  };
}
