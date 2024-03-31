import { set, connect, Schema, model } from 'mongoose'

set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

connect(url)

	.then(_ => {
		console.log('connected to MongoDB')
	})
	.catch(error => {
		console.log('error connecting to MongoDB:', error.message)
	})

const noteSchema = new Schema({
	content: {
		type: String,
		minLength: 5,
		required: true,
	},

	important: Boolean,
})

noteSchema.set('toJSON', {
	transform: (_, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		// biome-ignore lint/performance/noDelete: <explanation>
		delete returnedObject._id
		// biome-ignore lint/performance/noDelete: <explanation>
		delete returnedObject.__v
	},
})

export default model('Note', noteSchema)
