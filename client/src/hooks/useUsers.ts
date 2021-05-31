import { useCallback } from 'react'
import { Dispatch } from 'redux'
import { useSelector } from 'react-redux'
import { TRootState } from '../types/types'
import { IUser } from '../types/types'
import { fetchUser, fetchUsers, addUser, editUser, removeUser } from '../redux/actions/userActions'

type TGetCurrentUser = (userId: string) => IUser | undefined

type TUseUsers = (userQueryString?: string) => {
	filteredUsersList: Array<IUser>
	errorMessage: string
	getCurrentUser: TGetCurrentUser
	retrieveUser: (userId: string) => (dispatch: Dispatch) => void
	retrieveUsers: () => (dispatch: Dispatch) => void
	createUser: (user: Omit<IUser, 'id'>) => (dispatch: Dispatch) => void
	updateUser: (userId: string, user: Partial<IUser>) => (dispatch: Dispatch) => void
	deleteUser: (userId: string) => (dispatch: Dispatch) => void
}

const useUsers: TUseUsers = (userQueryString = '') => {
	const { usersList, errorMessage } = useSelector((state: TRootState) => state.users)

	const filteredUsersList = usersList.filter(user => {
		let userMatchesTheQuery = false

		const userValues = Object.values(user)

		userValues.forEach(value => {
			if (value.toLowerCase().includes(userQueryString.toLowerCase())) {
				userMatchesTheQuery = true
			}

			return false
		})

		return userMatchesTheQuery
	})

	const getCurrentUser: TGetCurrentUser = (userId) =>
		usersList.find(({ id }: IUser) => id === userId)

	const retrieveUser = useCallback((userId: string) => {
		return fetchUser(userId)
	}, [])

	const retrieveUsers = useCallback(() => {
		return fetchUsers()
	}, [])

	const createUser = (user: Omit<IUser, 'id'>) => {
		return addUser(user)
	}

	const updateUser = (userId: string, user: Partial<IUser>) => {
		return editUser(userId, user)
	}

	const deleteUser = (userId: string) => {
		return removeUser(userId)
	}

	return {
		filteredUsersList,
		errorMessage,
		getCurrentUser,
		retrieveUser,
		retrieveUsers,
		createUser,
		updateUser,
		deleteUser
	}
}

export default useUsers
