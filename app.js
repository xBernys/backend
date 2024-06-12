import cors from 'cors'
import express, { json } from 'express'
import 'express-async-errors'
import { connect, set } from 'mongoose'
import loginRouter from './controllers/login.js'
import notesRouter from './controllers/notes.js'
import usersRouter from './controllers/users.js'
import { MONGODB_URI } from './utils/config.js'
import { error, info } from './utils/logger.js'
import {
	errorHandler,
	requestLogger,
	unknownEndpoint,
} from './utils/middelware.js'

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
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
