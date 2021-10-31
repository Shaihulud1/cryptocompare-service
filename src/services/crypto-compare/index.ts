import YAML from 'yaml'
import fs from 'fs'
import path from 'path'
import { CompareConfig } from './utils/types'

export const getCryptoCompareConfig = (): CompareConfig => {
    const file = fs.readFileSync(path.resolve(__dirname, 'crypto-compare.yml'), 'utf-8')
    return YAML.parse(file)
}

