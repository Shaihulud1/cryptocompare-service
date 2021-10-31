import Axios, { AxiosInstance } from 'axios';

export default class CurrencyApi {
    private requestClient: AxiosInstance

    constructor(private crypt: string[], private currencies: string[]) {
        this.requestClient = Axios.create({
            baseURL: 'https://min-api.cryptocompare.com',
        });
    }

    public async fetchCurrencyCompare<Response>() {
        return this.requestClient.request<Response>({
            url: '/data/pricemultifull',
            method: 'GET',
            params: {
                fsyms: this.crypt.join(","),
                tsyms: this.currencies.join(","),
            }
        })
    }
}