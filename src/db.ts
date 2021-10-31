import { createConnection } from 'typeorm'
import Cryptocurrency from '@app/entities/Cryptocurrency'
import Moneycurrency from '@app/entities/Moneycurrencty'
import CryptoCompare from '@app/entities/CryptoCompare'

export const connect2Db = async () => {
    try {
        const connect = await createConnection({
            type: 'mysql',
            host: 'mysql',
            port: 3306,
            username: 'mysqluser',
            password: 'mysqluspass',
            database: 'db',
            entities: [
                Cryptocurrency, 
                Moneycurrency, 
                CryptoCompare
            ],
        })
        connect.synchronize(false)
    } catch (error) {
        console.error(error)
        throw new Error('Cannot connect to database')
    }
}