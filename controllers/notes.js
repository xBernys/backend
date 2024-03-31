import { Router } from 'express'
import Note from '../models/note.js'

const notesRouter = Router()

notesRouter.get('/', (_, res) => Note.find({}).then(notes => res.json(notes)))

notesRouter.get('/:id', (req, res, next) =>
	Note.findById(req.params.id)
		.then(note => (note ? res.json(note) : res.status(404).end()))
		.catch(error => next(error)),
)

notesRouter.post('/', (req, res, next) => {
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
		.catch(error => next(error))
})

notesRouter.delete('/:id', (req, res, next) =>
	Note.findByIdAndDelete(req.params.id)
		.then(() => res.status(204).end())
		.catch(error => next(error)),
)

notesRouter.put('/:id', (req, res, next) =>
	Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(updatedNote => res.json(updatedNote))
		.catch(error => next(error)),
)

export default notesRouter
