import { describe, expect, test } from 'bun:test'
import { average } from '../utils/for_testing'

describe('average', () => {
	test('of one value is the value itself', () => {
		expect(average([1])).toBe(1)
	})

	test('of many is calculated right', () => {
		expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5)
	})

	test('of empty array is zero', () => {
		expect(average([])).toBe(0)
	})
})
