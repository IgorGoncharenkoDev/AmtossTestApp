export type TUser = {
  id: string
  name: string
  age: string
  location: string
  maritalStatus: string
  children: string
}

export type TRootState = {
  users: {
    usersList: Array<TUser>
  }
}
