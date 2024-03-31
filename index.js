import 'dotenv/config'
import express, { json } from 'express'
import cors from 'cors'
import Note from './models/note.js'

const app = express()
app.use(json())
app.use(express.static('dist'))
app.use(cors())

// app.get('/api/notes', (_, res) => {
// 	res.json(notes)
// })

app.get('/api/notes', (_, res) => {
	Note.find({}).then(notes => res.json(notes))
})

app.get('/api/notes/:id', (req, res, next) => {
	Note.findById(req.params.id)
		.then(note =>
			note
				? res.json(note)
				: res.status(400).send({ error: 'malformatted id' }),
		)
		.catch(err => next(err))
})

app.post('/api/notes', (req, res, next) => {
	const body = req.body

	const note = new Note({
		content: body.content,
		important: body.important || false,
	})

	note
		.save()
		.then(savedNote => {
			res.json(savedNote)
		})
		.catch(err => next(err))
})

app.put('/api/notes/:id', (req, res, next) => {
	Note.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		context: 'query',
	})
		.then(note => res.json(note))
		.catch(err => next(err))
})

app.delete('/api/notes/:id', (req, res, next) => {
	Note.findByIdAndDelete(req.params.id)
		.then(note =>
			note
				? res.status(204).json(note)
				: res.status(204).json({ error: 'The note does not exist' }),
		)
		.catch(err => next(err))
})

//midelware
const errorHandler = (error, _, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
