import { Field, Float, ID, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import NetWorth from "./NetWorth"


@Entity()
@ObjectType()
export default class CryptoCurrency extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number

    @Column()
    @Field()
    name: string

    @Column('float')
    @Field(() => Float)
    amount: number

    @Column()
    @Field()
    ticker: string

    @ManyToOne(() => NetWorth, netWorth => netWorth.cryptoOwned)
    netWorth: NetWorth
}