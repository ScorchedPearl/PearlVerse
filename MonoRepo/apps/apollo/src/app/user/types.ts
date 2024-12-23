
export const types=`#graphql
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
`