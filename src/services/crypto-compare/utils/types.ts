export type CompareConfig = {
    currencies: string[]
    cryptos: string[]
    fields: string[]
}

export type ApiNormilizeInput = Record<string, Record<string, Record<string, string>>>

export type ApiResponse = Record<string, Record<string, Record<string, string>>>