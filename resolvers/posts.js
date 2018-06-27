export default {
    
  Query:{
      getPost: (parent, args, {models}) => models.Post.findOne(args)
  },

  Mutation:{
      createPost: async(parent, args, {models, user}) => {
          const posts = await models.Post.create(
              {...args.post,by: user}
          )
          return posts
      }
  }
}