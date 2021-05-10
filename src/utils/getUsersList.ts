import { v4 as uuidv4 } from 'uuid'
import faker from "faker"
import { maritalStatuses } from '../constants'
import { TUser } from '../types/types'

const getRandomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min)

const getRandomMaritalStatus = (): string =>
  maritalStatuses[ getRandomInteger(0, 2) ]

export const getUsersList = (usersNumber: number): Array<TUser> => {
  const user = () => ({
    id: uuidv4(),
    name: `${ faker.name.firstName() } ${ faker.name.lastName() }`,
    age: String(getRandomInteger(23, 65)),
    location: faker.address.city(),
    maritalStatus: getRandomMaritalStatus(),
    children: String(getRandomInteger(0, 5))
  })

  const userListDraft = new Array(usersNumber).fill(null, 0, usersNumber)

  return userListDraft.map(item => user())
}
