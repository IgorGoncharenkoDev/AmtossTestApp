import { TUser } from '../../types/types'

type TUpdateUser = (usersList: Array<TUser>, userToUpdate: TUser) => Array<TUser>

const updateUser: TUpdateUser = (usersList, userToUpdate) =>
	usersList.map(existingUser => {
		if (existingUser.id !== userToUpdate.id) {
			return existingUser
		}

		return userToUpdate
	})

export default updateUser
