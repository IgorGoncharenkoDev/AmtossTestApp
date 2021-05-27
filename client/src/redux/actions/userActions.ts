import { actionTypes } from './actionTypes'
import { TUser } from '../../types/types'

type setUsers = (usersList: Array<TUser>) => {
	type: string,
	payload: Array<TUser>
}

type TAddUser = (userData: TUser) => {
	type: string,
	payload: TUser
}

type TUpdateUser = (userData: TUser) => {
	type: string,
	payload: TUser
}

type TRemoveUser = (userId: string) => {
	type: string,
	payload: string
}

export const addUser: TAddUser = (user) => {
	return {
		type: actionTypes.ADD_USER,
		payload: user
	}
}

export const setUsers: setUsers = (usersList) => {
	return {
		type: actionTypes.SET_USERS,
		payload: usersList
	}
}

export const updateUser: TUpdateUser = (user) => {
	return {
		type: actionTypes.UPDATE_USER,
		payload: user
	}
}

export const removeUser: TRemoveUser = (userId) => {
	return {
		type: actionTypes.REMOVE_USER,
		payload: userId
	}
}
