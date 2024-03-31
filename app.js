import { MONGODB_URI } from './utils/config.js'
import express, { json } from 'express'
import cors from 'cors'
import notesRouter from './controllers/notes.js'
import {
	requestLogger,
	unknownEndpoint,
	errorHandler,
} from './utils/middelware.js'
import { set, connect } from 'mongoose'
import { error, info } from './utils/logger.js'

const app = express()
set('strictQuery', false)

info('connecting to', MONGODB_URI)

connect(MONGODB_URI)
	.then(() => {
		info('connected to MongoDB')
	})
	.catch(err => {
		error('error connecting to MongoDB:', err.message)
	})

app.use(cors())
app.use(express.static('dist'))
app.use(json())
app.use(requestLogger)

app.use('/api/notes', notesRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
