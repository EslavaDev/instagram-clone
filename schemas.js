export default `


    type User {
        _id: ID!
        username: String!
        password: String!
    }

    type Query{
        message: String
        getOneUser(_id: ID!): User!
        getAllUser: [User!]!
    }

    type Mutation{
        createUser(username: String!, password: String!): User!
    }
`;