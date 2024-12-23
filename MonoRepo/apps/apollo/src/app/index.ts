import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { prismaClient } from "../ clients/db";
import { User } from "./user";
import { GraphqlContext } from "../interfaces";
import JWTService from "../services/jwt";
export async function initServer(){
  const app=express();
  app.use(bodyParser.json());
  app.use(cors());
  const server = new ApolloServer<GraphqlContext>({
    typeDefs:`
      ${User.types}
  
      type Query{
          ${User.query}
      }
      type Mutation{
          ${User.mutations}
      }
    `,
    resolvers:{
      Query:{
        ...User.resolvers.queries,
      },
      Mutation:{
      },
    },
  });
  await server.start();
  app.use("/graphql",expressMiddleware(server,{ context : async({req,res})=> {
    return {
      user:req.headers.authorization? await JWTService.decodeToken(req.headers.authorization.split('Bearer ')[1]):undefined
    }
  }}))
  return app;
}
