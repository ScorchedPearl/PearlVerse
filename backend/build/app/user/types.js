"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = `#graphql
interface Avatar{
    id:ID!
    avatarId:String
}
 type User {
     id:ID!
     name:String!
     username:String
     email:String!
     profileImageURL:String
     avatar:Avatar
     avatarId:String
     createdAt:String!
     updatedAt:String!
   }
`;
