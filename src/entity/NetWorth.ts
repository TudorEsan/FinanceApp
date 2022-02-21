import { Field, Float, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import CryptoCurrency from "./Crypto";
import Diversification from "./Diversification";
import Stock from "./Stocks";
import { User } from "./User";

@ObjectType()
@Entity()
export default class NetWorth extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  // implement Date Field
  @Column({ type: "date", default: new Date() })
  date: Date;

  @Field(() => Float)
  @Column("float")
  totalBallance: number;

  @OneToMany(() => Stock, (stock) => stock.netWorth)
  @Field(() => [Stock])
  stocksOwned: Stock[];

  @Field(() => Float)
  @Column({ type: "float" })
  stocksBallance: number;

  @OneToOne(
    () => Diversification,
    (diversification) => diversification.netWorth
  )
  @Field(() => Diversification!)
  stockDiversification: Diversification;

  @OneToMany(() => CryptoCurrency, (cryptoCurrency) => cryptoCurrency.netWorth)
  @Field(() => [CryptoCurrency!])
  cryptoOwned: CryptoCurrency[];

  @OneToOne(
    () => Diversification,
    (diversification) => diversification.netWorth
  )
  @Field(() => Diversification!)
  cryptoDiversification: Diversification;

  @Field(() => Float)
  @Column("float")
  cryptoBalance: number;

  @ManyToOne(() => User, (user) => user.netWorth)
  user: User;
}
