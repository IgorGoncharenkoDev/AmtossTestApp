import { partial } from 'ramda'

type TMethod = 'POST' | 'PUT' | 'PATCH'

const baseUrl = 'http://localhost:3010'

const get = (url: string) =>
	fetch(`${ baseUrl }${ url }`, {
		method: 'GET'
	})
		.then((response) => response.json())

export const postPutPatch = (
	method: TMethod,
	url: string,
	data: Record<string, any>
) =>
	fetch(`${ baseUrl }${ url }`, {
		method: method,
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})

export const post = partial(postPutPatch, [ 'POST' ])

export const put = partial(postPutPatch, [ 'PUT' ])

export const patch = partial(postPutPatch, [ 'PATCH' ])

export const remove = (url: string) =>
	fetch(`${ baseUrl }${ url }`, {
		method: 'DELETE'
	})
		.then((response) => response.json())

const api = { get, post, put, patch, remove }

export default api
