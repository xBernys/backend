import { info, error } from './logger.js'

const requestLogger = (req, _, next) => {
	info('Method:', req.method)
	info('Path:  ', req.path)
	info('Body:  ', req.body)
	info('---')
	next()
}

const unknownEndpoint = (_, res) =>
	res.status(404).send({ error: 'unknown endpoint' })

const errorHandler = (err, _, res, next) => {
	error(err.message)

	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	}
	if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message })
	}

	next(err)
}

export { requestLogger, unknownEndpoint, errorHandler }
