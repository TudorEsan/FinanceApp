import { Field, Float, ID, ObjectType } from "type-graphql"
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"
import NetWorth from "./NetWorth"


@Entity()
@ObjectType()
export default class Stock {
    @PrimaryColumn()
    @Field(() => ID)
    id: number

    @Column()
    @Field()
    ticker: string

    @Column()
    @Field()
    name: string

    @Column('float')
    @Field(() => Float)
    amount: number

    @ManyToOne(() => NetWorth, netWorth => netWorth.stocksOwned)
    netWorth: NetWorth
}