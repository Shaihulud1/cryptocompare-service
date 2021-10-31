import CurrencyRepository from "@app/repositories/utils/CurrencyRepository";
import Cryptocurrency from "@app/entities/Cryptocurrency";
import { EntityRepository } from "typeorm";

@EntityRepository(Cryptocurrency)
export default class CryptocurrencyRepository extends CurrencyRepository<Cryptocurrency> {}