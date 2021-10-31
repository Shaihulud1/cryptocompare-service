import 'reflect-metadata';
import { createExpressServer } from 'routing-controllers';
import dotenv from 'dotenv'
import CryptoCompareController from '@app/controllers/CryptoCompareController'
import { connect2Db } from '@app/db'
import runScheduler from '@app/services/scheduler'
import { configureContainer } from '@app/di'

const runApp = async () => {
    const config = dotenv.config()
    await connect2Db()
    const di = await configureContainer()
    runScheduler(di)
    const app = createExpressServer({
        controllers: [
            CryptoCompareController
        ],
        routePrefix: 'service'
    });

    if (!config.parsed?.APP_PORT) {
        throw new Error('You need to fill APP_PORT parameter into .env file')
    }
    const port = config.parsed.APP_PORT
    try {
        app.listen(port)
        console.log('🚀 Server is running on port ' + port);
    } catch (err) {
        console.error(err);
    }
}
runApp()

