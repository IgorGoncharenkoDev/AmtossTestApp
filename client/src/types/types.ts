export interface IUser {
  id: string
  name: string
  age: string
  location: string
  maritalStatus: string
  children: string
}

type TUsersState = {
  usersList: Array<IUser>
}

export type TRootState = {
  users: TUsersState
}
