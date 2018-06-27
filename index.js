import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import models from './models';

//Mezclar archivos de types y resolvers
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));
//

const myGraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})
const PORT = 3000;


const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', express.json(), graphqlExpress({ 
    schema: myGraphQLSchema,
    context: {
        models,
        user:{
            _id:1,
            username:"daniel"
        }
    } 
}));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled
mongoose.connect('mongodb://localhost/instagram-clone')    
    .then(() => app.listen(PORT, () => console.log(`mongodb connected + running server ${PORT}`)))
    .catch(e => console.log(e))
; 