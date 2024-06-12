import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  // notes: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Note',
  //   },
  // ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // biome-ignore lint/performance/noDelete: <explanation>
    delete returnedObject._id
    // biome-ignore lint/performance/noDelete: <explanation>
    delete returnedObject.__v
  },
})

export default model('User', userSchema)
