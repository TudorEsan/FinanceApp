import dotenv from "dotenv";
import { Response } from "express";
import { sign } from "jsonwebtoken";
import { inXdays, inXMinutes } from "./date";

dotenv.config({ path: __dirname + "/.env" });

export const getJWT = (userId: number) => {
  return sign(
    {
      userId,
    },
    process.env.JWTSECRET as string,
    { expiresIn: "15m" }
  );
};

export const getRefreshToken = () => {
  return sign({}, process.env.REFRESH_SECRET as string, { expiresIn: "15d" });
};

export const refreshTokens = (res: Response, userId: number) => {
  res.cookie("refresh-token", getRefreshToken(), {
    expires: inXdays(15),
    sameSite: "none",
    httpOnly: true,
    secure: true,
  });
  res.cookie("access-token", getJWT(userId), {
    expires: inXMinutes(15),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};
