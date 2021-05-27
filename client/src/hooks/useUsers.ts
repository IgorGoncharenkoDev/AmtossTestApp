import { useSelector } from 'react-redux'
import api from '../api'
import { setUsers } from '../redux/actions/userActions'
import { TRootState } from '../types/types'
import { TUser } from '../types/types'

type TGetCurrentUser = (userId: string) => TUser | undefined

type TUseUsers = (userQueryString?: string) => {
	fetchUsers: () => void,
	filteredUsersList: Array<TUser>,
	getCurrentUser: TGetCurrentUser
}

const useUsers: TUseUsers = (userQueryString = '') => {
	const { usersList } = useSelector((state: TRootState) => state.users)

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

	const getCurrentUser: TGetCurrentUser = (userId) => {
		return usersList.find(({ id }: TUser) => id === userId)
	}

	/* api calls */

	const fetchUsers = () => {
		api.get('/users')
			.then(data => setUsers(data))
	}

	return {
		filteredUsersList,
		getCurrentUser,
		fetchUsers
	}
}

export default useUsers
