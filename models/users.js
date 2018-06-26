import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "el campo usuario es requerido"] 
  },
  password: String
})

const userModel = mongoose.model('User', userSchema)

export default userModel;