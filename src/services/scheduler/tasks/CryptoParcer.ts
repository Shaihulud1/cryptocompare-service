import { singleton } from 'tsyringe';
import { Task } from '../utils/types';
import CurrencyApi from '@app/services/currency-api'
import { DeleteResult, getCustomRepository, getRepository, InsertResult, Repository } from 'typeorm';
import CryptocurrencyRepository from '@app/repositories/CryptocurrencyRepository';
import Cryptocurrency from '@app/entities/Cryptocurrency';
import MoneycurrencyRepository from '@app/repositories/MoneycurrencyRepository';
import Moneycurrency from '@app/entities/Moneycurrencty';
import CryptoCompare from '@app/entities/CryptoCompare';
import { getCryptoCompareConfig } from '@app/services/crypto-compare';

type CurrencyResponse = {
    DISPLAY: Record<string, Record<string, string>>
}

@singleton()
export default class CryptoParcer implements Task {
    public name = 'Parsing cryptocurrencies';

    private cryptoRepo: CryptocurrencyRepository
    private moneyRepo: MoneycurrencyRepository
    private criptoCompareRepo: Repository<CryptoCompare>

    public time = {
        minutes: 1,
    };

    public constructor() {
        this.cryptoRepo = getCustomRepository(CryptocurrencyRepository)
        this.moneyRepo = getCustomRepository(MoneycurrencyRepository)
        this.criptoCompareRepo = getRepository(CryptoCompare)
        
    }

    public async run(): Promise<void> {
        const { cryptos, currencies, fields } = getCryptoCompareConfig()

        await this.fillCurrencies(cryptos, currencies)
        await this.deleteOldCurrencies(cryptos, currencies)

        const api = new CurrencyApi(cryptos, currencies)
        const response = await api.fetchCurrencyCompare<CurrencyResponse>()
        const { data, status } = response
        if (status !== 200) {
            throw new Error('Bad Request')
        }
        for (let [crypto, currencies] of Object.entries(data.DISPLAY)) {
            for (let [currency, info] of Object.entries(currencies)) {
                const compareData: Record<string, string> = {}
                for (let [field, value] of Object.entries(info)) {
                    if (fields.includes(field)) {
                        compareData[field] = value
                    }
                }
                this.createOrUpdateCurrencyCompare(crypto, currency, compareData)
            }
        }
    }

    private async fillCurrencies(cryptos: string[], currencies: string[]) {
        const promises: Promise<InsertResult>[] = []
        currencies.forEach(item => promises.push(this.moneyRepo.createCurrencyIfNotExist(item, Moneycurrency)))
        cryptos.forEach(item => promises.push(this.cryptoRepo.createCurrencyIfNotExist(item, Cryptocurrency)))
        return Promise.all(promises)
    }

    private async deleteOldCurrencies(cryptos: string[], currencies: string[]) {
        const promises: Promise<DeleteResult>[] = [
            this.cryptoRepo.deleteNotActualCurrency(cryptos, Cryptocurrency),
            this.moneyRepo.deleteNotActualCurrency(currencies, Moneycurrency)
        ]
        return Promise.all(promises)
    }

    private async createOrUpdateCurrencyCompare(crypto: string, curr: string, compareData: Record<string, string>) {
        const foundCompare = await this.criptoCompareRepo.findOne({
            where: {
                cryptocurrency: {
                    code: crypto
                },
                moneycurrency: {
                    code: curr
                }
            },
        })
        if (!foundCompare) { //add new
            const cryptoObj = await this.cryptoRepo.findOneOrFail(crypto)
            const moneyObj = await this.moneyRepo.findOneOrFail(curr)
            const cryptoCompareAdd = new CryptoCompare
            cryptoCompareAdd.data = compareData
            cryptoCompareAdd.cryptocurrency = cryptoObj
            cryptoCompareAdd.moneycurrency = moneyObj
            await this.criptoCompareRepo.save(cryptoCompareAdd);
        } else if (JSON.stringify(foundCompare.data) !== JSON.stringify(compareData)) { //update
            foundCompare.data = compareData
            this.criptoCompareRepo.save(foundCompare)
        }
    }
}

