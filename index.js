import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import models from './models';
import cors from 'cors'

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



const PORT = 4000;


const app = express();

app.use(cors({
    origin:["http://localhost:3001"]
}))

app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type,  Accept, Access-Control-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
	next();
});

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