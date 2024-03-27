import express, { json } from 'express'
import cors from 'cors'
import { maxId } from './src/functionality.js'

let notes = [
	{
		id: 1,
		content: 'HTML is easy',
		important: true,
	},
	{
		id: 2,
		content: 'Browser can execute only JavaScript',
		important: false,
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		important: true,
	},
]

const app = express()
app.use(json())
app.use(cors())

app.get('/api/notes', (request, response) => {
	response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	const note = notes.find(note => note.id === id)
	note ? response.json(note) : response.status(404).end()
})

app.post('/api/notes', (req, res) => {
	const { content, important } = req.body

	if (!content) {
		return res.status(404).json({ error: 'content missing' })
	}
	const note = {
		id: maxId(),
		constent: content,
		import: important || false,
	}

	notes = [note, ...notes]
	res.json(note)
})

app.put('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id)
	notes = notes.map(note => (note.id === id ? { id, ...req.body } : note))

	res.json(notes.find(note => note.id === id))
})

app.delete('/api/notes/:id', (req, res) => {
	const id = Number(req.params.id)

	notes = notes.filter(note => note.id !== id)
	res.status(204).json({ message: 'eliminado satisfactoriamente' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
