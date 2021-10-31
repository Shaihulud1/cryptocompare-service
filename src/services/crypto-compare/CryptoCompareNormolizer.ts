import { getCryptoCompareConfig } from './index'
import { ApiResponse, ApiNormilizeInput } from './utils/types'
import CryptoCompare from '@app/entities/CryptoCompare'

export default class CryptoCompareNormolizer {
    
    public cryptoCompareAPINormolize(cryptocompare: ApiNormilizeInput) {
        const { fields: configFields } = getCryptoCompareConfig()
        for (let [crypto, currencies] of Object.entries(cryptocompare)) {
            for (let [currency, fields] of Object.entries(currencies)) {
                for (let [field, _val] of Object.entries(fields)) {
                    if (!configFields.includes(field)) {
                        delete(cryptocompare[crypto][currency][field])
                    }
                }
            }
        }
        return cryptocompare
    }

    public cryptoCompareDBNormolize(cryptocomparies: CryptoCompare[]): ApiResponse {
        return cryptocomparies.reduce((acc: ApiResponse, value: CryptoCompare) => {
            for (let [field, val] of Object.entries(value.data)) {
                if (!acc[value.cryptocurrency.code]) {
                    acc[value.cryptocurrency.code] = {}
                }
                if (!acc[value.cryptocurrency.code][value.moneycurrency.code]) {
                    acc[value.cryptocurrency.code][value.moneycurrency.code] = {}
                }
                acc[value.cryptocurrency.code][value.moneycurrency.code][field] = val
            }
            return acc
        }, {})
    }
} 