import "reflect-metadata";
import cookieParser from 'cookie-parser'
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import CryptoCurrency from "./entity/Crypto";
import Diversification from "./entity/Diversification";
import Investment from "./entity/Investment";
import NetWorth from "./entity/NetWorth";
import Stock from "./entity/Stocks";
import { User } from "./entity/User";
import UserResolver from "./Resolvers/User/UserResolvers";
import cors from "cors";
import { MyContext } from "./types/context";
import { CustomAuthChecker } from "./Resolvers/User/CustomAuthorization";

const main = async () => {
  await createConnection();

  const app = Express();
  const schema = await buildSchema({
    resolvers: [UserResolver],
    authChecker: CustomAuthChecker
  });
  app.use(cookieParser())
  const server = new ApolloServer({
    schema,
    context: ({ req, res }: MyContext) => ({ req, res }),
  });
  const cors = {
    credentials: true,
    origin: "https://studio.apollographql.com",
  };
  await server.start();
  server.applyMiddleware({ app, cors });

  app.listen(8000, () => {
    console.log("server is running");
  });
};

main();
