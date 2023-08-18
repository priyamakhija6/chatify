import { ApolloServer } from "apollo-server"
import typeDefs from './typeDefs.js'
import resolvers from './resolvers.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
        const {authorization} =  req.headers
        if(authorization){
            const {userId} =  jwt.verify(authorization,process.env.JWT_SECRET)
            return {userId}
        }
    }
});

server.listen(4000).then(({ url }) => {
    console.log(`Graphql server is running 🏃🏃 at ${url}`);
    //console.log(`subscriptions are ready at ${subscriptionsUrl}`);
});
