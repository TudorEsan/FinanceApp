import { MyContext } from "src/types/context";
import { AuthChecker } from "type-graphql";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
import { IPayload } from "src/types/jwt";
import { refreshTokens } from "../../utils/auth";

dotenv.config({ path: __dirname + "/.env" });
export const CustomAuthChecker: AuthChecker<MyContext> = ({ context }) => {
  try {
    const token = context.req.cookies["access-token"];
    const payload = jwt.verify(token, process.env.JWTSECRET as string, {
      ignoreExpiration: true,
    }) as IPayload;
    context.userId = payload.userId;
    jwt.verify(token, process.env.JWTSECRET as string) as IPayload;
    refreshTokens(context.res, payload.userId);
    return true;
  } catch (e) {
    console.error(e)
    if (e instanceof TokenExpiredError) {
      try {
        console.log("expired");
        const token = context.req.cookies["access-token"];
        const refreshToken = context.req.cookies["refresh-token"];
        console.log(process.env.REFRESH_SECRET, process.env.JWTSECRET);
        jwt.verify(refreshToken, process.env.REFRESH_SECRET as string);
        const payload = jwt.verify(token, process.env.JWTSECRET as string, {
          ignoreExpiration: true,
        }) as IPayload;
        refreshTokens(context.res, payload.userId);
        return true;
      } catch (e) {
        console.error(e);
      }
    }
  }
  return false;
};
