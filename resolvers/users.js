export default {
    
    Query:{
        message: ( parent, args, context ) => "Hola Mundo",
        getAllUser: (parent, args, {models} ) => models.User.find(),
        getOneUser: (parent, args, {models}) => models.User.findOne(args)
    },

    Mutation:{
        createUser: async(parent, args, {models}) => {
            const user = await models.User.create(
                args
            )
            return user
        }
    }
}