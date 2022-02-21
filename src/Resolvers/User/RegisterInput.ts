import { Field, InputType } from "type-graphql";
import { IsEmail, MinLength } from 'class-validator'

@InputType()
export class RegisterInput {
	@Field()
	@MinLength(4)
  username: string;

  @Field()
  @MinLength(8)
  password: string;

  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class LoginInput {
	@Field()
	username: string

	@Field()
	password: string
}