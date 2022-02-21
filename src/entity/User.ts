import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { formatWithOptions } from "util";
import NetWorth from "./NetWorth";

export enum UserRole {
  ADMIN = "admin",
  REGULAR = "regular",
}

registerEnumType(UserRole, {
  name: "Direction", // this one is mandatory
  description: "User Roles", // this one is optional

})

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  @Field()
  password: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Field(() => [NetWorth], { nullable: true})
  @OneToMany(() => NetWorth, (netWorth) => netWorth.user, { cascade: true,   })
  netWorth: NetWorth[];

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.REGULAR,
  })
  @Field(() => UserRole)
  role: UserRole

  @Column({
    default: new Date(Date.now())
  })
  @Field()
  createdAt: Date
}
