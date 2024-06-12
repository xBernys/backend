import { compare } from 'bcrypt'
import { Router } from 'express'
import { sign } from 'jsonwebtoken'
import User from '../models/user'

const loginRouter = Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const passwordCorrect = !user
    ? false
    : await compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = sign(userForToken, process.env.SECRET, { expiresIn: '1d' })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user.id })
})

export default loginRouter
