const requestLogger = (req, _, next) => {
  // info('Method:', req.method)
  // info('Path:  ', req.path)
  // info('Body:  ', req.body)
  // info('---')
  next()
}

const unknownEndpoint = (_, res) =>
  res.status(404).send({ error: 'unknown endpoint' })

const errorHandler = (err, _, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }
  if (
    err.name === 'MongoServerError' &&
    err.message.includes('E11000 duplicate key error')
  ) {
    return res.status(400).json({ error: 'expected `username` to be unique' })
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'token invalid' })
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired',
    })
  }

  next(err)
}

export { errorHandler, requestLogger, unknownEndpoint }
