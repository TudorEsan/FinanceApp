import { User } from "../../entity/User";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { LoginInput, RegisterInput } from "./RegisterInput";
import dotenv from "dotenv";
import argon from "argon2";
import { getJWT, getRefreshToken } from "../../utils/auth";
import { MyContext } from "../../types/context";
import { inXdays, inXMinutes } from "../../utils/date";
dotenv.config();

@Resolver()
export default class UserResolver {
  @Query(() => User)
  @Authorized()
  async getUser(@Ctx() { userId }: MyContext) {
    console.log(userId)
    const user = await User.findOne({
      where: {
        id: userId,
      },
    relations: ['netWorth']
    });
    console.log(user)
  return user;
  }
  @Mutation(() => User)
  async register(@Arg("input") { username, password, email }: RegisterInput) {
    const hashedPassword = await argon.hash(password);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    }).save();
    return newUser;
  }
  @Mutation(() => User)
  async login(
    @Arg("input") { username, password }: LoginInput,
    @Ctx() { res }: MyContext
  ) {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      throw Error("No user found with this username");
    }
    try {
      await argon.verify(user.password, password);
    } catch (e) {
      return null;
    }
    const accessToken = getJWT(user.id);
    const refreshToken = getRefreshToken();
    res.cookie("refresh-token", refreshToken, {
      expires: inXdays(15),
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });
    res.cookie("access-token", accessToken, {
      expires: inXMinutes(15),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    return user;
  }
}
