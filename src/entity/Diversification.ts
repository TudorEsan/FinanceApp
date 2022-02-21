import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Investment from "./Investment";
import NetWorth from "./NetWorth";

@Entity()
@ObjectType()
export default class Diversification extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @OneToMany(() => Investment, (investment) => investment.diversification)
  @Field(() => [Investment!])
  investments: Investment[];

  @OneToOne(() => NetWorth, (netWorth) => netWorth.stockDiversification)
  @OneToOne(() => NetWorth, (netWorth) => netWorth.cryptoDiversification)
  netWorth: NetWorth;
}
