// import bcrypt from 'bcrypt'
// import { beforeEach, describe, expect, test, afterAll, beforeAll } from 'bun:test'
// import supertest from 'supertest'
// import app from '../app.js'
// import User from '../models/user.js'
// import { usersInDb } from './test_herper.js'
// import mongoose from 'mongoose'

// const api = supertest(app)
// beforeAll()
// describe('when there is initially one user in db', () => {
// 	beforeEach(async () => {
// 		await User.deleteMany({})

// 		const passwordHash = await bcrypt.hash('sekret', 10)
// 		const user = new User({ username: 'root', passwordHash })

// 		await user.save()
// 	})

// 	test('creation succeeds with a fresh username', async () => {
// 		const usersAtStart = await usersInDb()

// 		const newUser = {
// 			username: 'mluukkai',
// 			name: 'Matti Luukkainen',
// 			password: 'salainen',
// 		}

// 		await api
// 			.post('/api/users')
// 			.send(newUser)
// 			.expect(201)
// 			.expect('Content-Type', /application\/json/)

// 		const usersAtEnd = await usersInDb()
// 		expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

// 		const usernames = usersAtEnd.map(u => u.username)
// 		expect(usernames.includes(newUser.username))
// 	})
// })

// afterAll(async () => {
// 	await mongoose.connection.close()
// })
