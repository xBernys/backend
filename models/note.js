import { Schema, model } from 'mongoose'

const noteSchema = new Schema({
	content: {
		type: String,
		required: true,
		minlength: 5,
	},
	important: Boolean,
})

noteSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		// biome-ignore lint/performance/noDelete: <explanation>
		delete returnedObject._id
		// biome-ignore lint/performance/noDelete: <explanation>
		delete returnedObject.__v
	},
})

export default model('Note', noteSchema)
