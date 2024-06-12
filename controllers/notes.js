import { Router } from 'express'
import jwt from 'jsonwebtoken'
import Note from '../models/note.js'
import User from '../models/user.js'

const notesRouter = Router()

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization?.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({}).populate('userId', { username: 1, name: 1 })
  return res.json(notes)
})

notesRouter.get('/:userId', async (req, res) => {
  const notes = await Note.find({ userId: req.params.userId }).populate(
    'userId',
    { username: 1, name: 1 }
  )
  console.log(notes)
  return res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
  console.log({ id: req.params.userId })
  const notes = await Note.findById(req.params.id)
  notes ? res.json(notes) : res.status(404).end()
})

notesRouter.post('/', async (req, res) => {
  const { content, important } = req.body

  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content,
    important: important || false,
    userId: user.id,
  })

  const createdNote = await note.save()
  res.status(201).json(createdNote)
})

notesRouter.put('/:id', async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  note ? res.json(note) : res.status(404).json({ note: 'not found' })
})

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

export default notesRouter
