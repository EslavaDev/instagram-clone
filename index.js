import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './schemas'
import resolvers from './resolvers'

const myGraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
})
const PORT = 3000;

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', express.json(), graphqlExpress({ schema: myGraphQLSchema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(PORT, () => console.log('running server'));