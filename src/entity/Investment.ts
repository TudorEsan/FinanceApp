import { Field, Float, ID, ObjectType } from "type-graphql"
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import Diversification from "./Diversification"


@ObjectType()
@Entity()
export default class Investment extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number
    @Column()
    @Field()
    ticker: string
    @Column('float')
    @Field(() => Float)
    percent: number
    @ManyToOne(() => Diversification, diversification => diversification.investments)
    diversification: Diversification
}