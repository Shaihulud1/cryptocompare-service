import CurrencyRepository from "@app/repositories/utils/CurrencyRepository";
import Moneycurrency from "@app/entities/Moneycurrencty";
import { EntityRepository } from "typeorm";

@EntityRepository(Moneycurrency)
export default class MoneycurrencyRepository extends CurrencyRepository<Moneycurrency> {}