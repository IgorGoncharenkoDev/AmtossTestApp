import React, { FunctionComponent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Table from './Table/Table'

import { TRootState } from '../types/types'
import { TUser } from '../types/types'

import { usersListStub } from '../stubs/stubs'

const UsersTable: FunctionComponent = () => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

  const { usersList } = useSelector((state: TRootState) => state.users)

  const userColumns = [ 'Name', 'Age', 'Location', 'Marital status', 'Children', '' ]

  const dispatch = useDispatch()

  /*useEffect(() => {
    const fetchUsers = (): Promise<Array<TUser>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = true

          if (!success) {
            reject('Something went wrong. Please, refresh the page')
          }

          resolve(usersListStub)
        }, 800)
      })
    }

    const getUsers = async () => {
      try {
        const usersList = await fetchUsers()
        setUsersList(usersList)
        dispatch(loadUsersList(usersList))
      }
      catch (error) {
        console.log(error)
      }

      setIsLoading(false)
    }

    getUsers()
  }, [])*/

  return (
    <Table
      columns={ userColumns }
      data={ usersList }
    />
  )
}

export default UsersTable
