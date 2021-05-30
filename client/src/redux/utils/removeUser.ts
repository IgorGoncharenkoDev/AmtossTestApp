import { IUser } from '../../types/types'

type TRemoveUser = (usersList: Array<IUser>, userIdToRemove: string) => Array<IUser>

const removeUser: TRemoveUser = (usersList, userIdToRemove) =>
	usersList.filter((existingUser: IUser) => existingUser.id !== userIdToRemove)

export default removeUser
