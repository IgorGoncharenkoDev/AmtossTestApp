import { IUser } from '../../types/types'

type TUpdateUser = (usersList: Array<IUser>, userToUpdate: IUser) => Array<IUser>

const updateUser: TUpdateUser = (usersList, userToUpdate) =>
	usersList.map(existingUser => {
		if (existingUser.id !== userToUpdate.id) {
			return existingUser
		}

		return userToUpdate
	})

export default updateUser
