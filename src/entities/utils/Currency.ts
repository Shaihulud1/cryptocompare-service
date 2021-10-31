import { BaseEntity, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class Currency extends BaseEntity {
    @PrimaryColumn({
        unique: true,
        length: 10
    })
    code: string
}