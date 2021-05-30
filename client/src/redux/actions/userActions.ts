import { /*ActionCreator, Action,*/ Dispatch } from 'redux'
// import { ThunkAction } from 'redux-thunk'
import { actionTypes } from './actionTypes'
import api from '../../api'
import { IUser } from '../../types/types'

export const fetchUser = (userId: string) => {
	return (dispatch: Dispatch) => {
		dispatch(fetchUserStart())

		try {
			api.get(`/users/${ userId }`)
				.then((user: IUser) => dispatch(fetchUserSuccess(user)))
		}
		catch (error) {
			dispatch(fetchUserFailure(error.message))
			console.log(error)
		}
	}
}

const fetchUserStart = () => ({
	type: actionTypes.FETCH_USER_START
})

const fetchUserSuccess = (user: IUser) => ({
	type: actionTypes.FETCH_USER_SUCCESS,
	payload: user
})

const fetchUserFailure = (errorMessage: string) => ({
	type: actionTypes.FETCH_USER_FAILURE,
	payload: errorMessage
})

export const fetchUsers = () => {
	return (dispatch: Dispatch) => {
		dispatch(fetchUsersStart())

		try {
			api.get('/users')
				.then((users: Array<IUser>) => dispatch(fetchUsersSuccess(users)))
		}
		catch (error) {
			dispatch(fetchUsersFailure(error.message))
			console.log(error)
		}
	}
}

const fetchUsersStart = () => ({
	type: actionTypes.FETCH_USERS_START
})

const fetchUsersSuccess = (users: Array<IUser>) => ({
	type: actionTypes.FETCH_USERS_SUCCESS,
	payload: users
})

const fetchUsersFailure = (errorMessage: string) => ({
	type: actionTypes.FETCH_USERS_FAILURE,
	payload: errorMessage
})

export const addUser = (user: Omit<IUser, 'id'>) => {
	return (dispatch: Dispatch) => {
		dispatch(addUserStart())

		try {
			api.post('/users', user)
				.then((user: IUser) => dispatch(addUserSuccess(user)))
		}
		catch (error) {
			console.log(error)
			dispatch(addUserFailure(error.message))
		}
	}
}

const addUserStart = () => ({
	type: actionTypes.ADD_USER_START
})

const addUserSuccess = (user: IUser) => ({
	type: actionTypes.ADD_USER_SUCCESS,
	payload: user
})

const addUserFailure = (errorMessage: string) => ({
	type: actionTypes.ADD_USER_FAILURE,
	payload: errorMessage
})

export const editUser = (userId: string, user: Partial<IUser>) => {
	return (dispatch: Dispatch) => {
		dispatch(editUserStart())

		try {
			api.patch(`/users/${ userId }`, user)
				.then((user: IUser) => {
					dispatch(editUserSuccess(user))
				})
		}
		catch (error) {
			console.log(error)
			dispatch(editUserFailure(error.message))
		}
	}
}

const editUserStart = () => ({
	type: actionTypes.EDIT_USER_START
})

const editUserSuccess = (user: IUser) => ({
	type: actionTypes.EDIT_USER_SUCCESS,
	payload: user
})

const editUserFailure = (errorMessage: string) => ({
	type: actionTypes.EDIT_USER_FAILURE,
	payload: errorMessage
})

export const removeUser = (userId: string) => {
	return (dispatch: Dispatch) => {
		dispatch(removeUserStart())

		try {
			api.remove(`/users/${ userId }`)
				.then(() => {
					dispatch(removeUserSuccess(userId))
				})
		} catch (error) {
			console.log(error)
			dispatch(removeUserFailure(error.message))
		}
	}
}

const removeUserStart = () => ({
	type: actionTypes.REMOVE_USER_START
})

const removeUserSuccess = (userId: string) => ({
	type: actionTypes.REMOVE_USER_SUCCESS,
	payload: userId
})

const removeUserFailure = (errorMessage: string) => ({
	type: actionTypes.REMOVE_USER_FAILURE,
	payload: errorMessage
})
