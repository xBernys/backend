import { notes } from '../database/notes.js'

export const maxId = () =>
	notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 0
