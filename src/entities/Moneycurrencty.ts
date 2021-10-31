import Currency from "@app/entities/utils/Currency"
import { Entity, OneToMany } from "typeorm"
import CryptoCompare from "@app/entities/CryptoCompare";

@Entity('money_currency')
export default class Moneycurrency extends Currency {
    @OneToMany(() => CryptoCompare, cryptoCompare => cryptoCompare.moneycurrency)
    public cryptoComparies!: CryptoCompare[];
}