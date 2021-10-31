import { Controller, Get, QueryParams } from 'routing-controllers'
import CurrencyApi from '@app/services/currency-api'
import { getCustomRepository } from "typeorm";
import CryptoCompareRepository from '@app/repositories/CryptoCompareRepository';
import CryptoCompareNormolizer from '@app/services/crypto-compare/CryptoCompareNormolizer'
import { IsNotEmpty } from 'class-validator';
import { IsActualCryptos } from '@app/validators/IsActualCryptos'
import { IsActualCurrencies } from '@app/validators/IsActualCurrencies';

type CurrencyResponse = {
    DISPLAY: Record<string, Record<string, Record<string, string>>>
}

class GetCryptoCompare {
    @IsActualCryptos()
    @IsNotEmpty()
    fsyms: string
    @IsActualCurrencies()
    @IsNotEmpty()
    tsyms: string
}

@Controller()
export default class CryptoCompareController {
    @Get('/price')
    public async getCryptoCompare(@QueryParams() query: GetCryptoCompare) {
        const { tsyms, fsyms } = query
        const moneyCurrs = tsyms.split(",")
        const cryptoCurrs = fsyms.split(",")
        const currApi = new CurrencyApi(cryptoCurrs, moneyCurrs)
        const response = await currApi.fetchCurrencyCompare<CurrencyResponse>()
        const cryptoCompareNormolizer = new CryptoCompareNormolizer
        if (response.status === 200) {
            return cryptoCompareNormolizer.cryptoCompareAPINormolize(response.data.DISPLAY)
        } else {
            const cryptoCompareRepo = getCustomRepository(CryptoCompareRepository)
            const cryptoComparies = await cryptoCompareRepo.findCompares(cryptoCurrs, moneyCurrs)
            return cryptoCompareNormolizer.cryptoCompareDBNormolize(cryptoComparies)
        }
    }
}
