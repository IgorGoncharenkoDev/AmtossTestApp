import { TUser } from '../../types/types'

type TRemoveUser = (usersList: Array<TUser>, userIdToUpdate: string) => Array<TUser>

const removeUser: TRemoveUser = (usersList, userIdToUpdate) =>
	usersList.filter((existingUser: TUser) => existingUser.id !== userIdToUpdate)

export default removeUser
