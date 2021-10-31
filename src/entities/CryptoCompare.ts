import { BaseEntity, Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Cryptocurrency from '@app/entities/Cryptocurrency'
import Moneycurrency from "@app/entities/Moneycurrencty";

type CryptoCurrencyData = Record<string, string>

@Entity('crypto_compare')
export default class CryptoCompare extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'json'
    })
    data: CryptoCurrencyData

    @ManyToOne(() => Cryptocurrency, cryptocurrency => cryptocurrency.code)
    @JoinTable()
    public cryptocurrency!: Cryptocurrency;
    
    @ManyToOne(() => Moneycurrency, moneycurrency => moneycurrency.code)
    @JoinTable()
    public moneycurrency!: Moneycurrency;
}