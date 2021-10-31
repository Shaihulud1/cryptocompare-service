import { EntityRepository, getRepository, Repository } from "typeorm";
import CryptoCompare from "@app/entities/CryptoCompare"

@EntityRepository(CryptoCompare)
export default class CryptoCompareRepository extends Repository<CryptoCompare> {
    public async findCompares(cryptoCurs: string[], moneyCurrs: string[]) {
        return await getRepository(CryptoCompare)
            .createQueryBuilder('cryptocompare')
            .innerJoinAndSelect("cryptocompare.cryptocurrency", "cryptocurrency")
            .innerJoinAndSelect("cryptocompare.moneycurrency", "moneycurrency")
            .getMany()
    }
}