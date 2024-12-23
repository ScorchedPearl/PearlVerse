import { prismaClient } from "../../ clients/db";
import { GraphqlContext } from "../../interfaces";
import { User } from "@prisma/client";
import UserSevice from "../../services/userservice";

const queries={
  verifyGoogleToken: async(parent:any,{token}:{token:string})=>{
    const session= await UserSevice.verifyGoogleAuthToken(token);
    return session;
  },
  getCurrentUser: async(parent:any, args:any, ctx:GraphqlContext)=>{
    const id=ctx.user?.id
    if(!id) return null
    const user= await prismaClient.user.findUnique({ where:{id} })
    console.log(user);
    return user;
  },
}
export const resolvers = { queries };