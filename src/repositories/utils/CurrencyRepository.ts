import { getConnection, Repository } from "typeorm";

export default class CurrencyRepository<Entity> extends Repository<Entity> {
    public async createCurrencyIfNotExist(code: string, entity: any) {
        return getConnection().createQueryBuilder()
            .insert()
            .into(entity)
            .values({ code })
            .orIgnore()
            .execute()
    }

    public async deleteNotActualCurrency(actualCurrencies: string[], entity: any) {
        return getConnection().createQueryBuilder()
            .delete()
            .from(entity)
            .where("code NOT IN (:currenciesCode)", { currenciesCode: [...actualCurrencies] })
            .execute()
    }
}