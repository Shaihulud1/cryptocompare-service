import Currency from "@app/entities/utils/Currency"
import { Entity, OneToMany } from "typeorm"
import CryptoCompare from "@app/entities/CryptoCompare";

@Entity('cripto_currency')
export default class Cryptocurrency extends Currency {
    @OneToMany(() => CryptoCompare, cryptoCompare => cryptoCompare.cryptocurrency)
    public cryptoComparies!: CryptoCompare[];
}