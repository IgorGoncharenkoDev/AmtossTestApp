import React, { useState, useEffect, FunctionComponent, SyntheticEvent } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CircularProgress, Box, Button } from '@material-ui/core'

import { PageContainer } from '../pages'
import CustomInput from '../components/CustomInput'

import useForm from '../hooks/useForm'

import { updateUser } from '../redux/actions/userActions'

import { maritalStatuses } from '../constants'

import { TRootState } from '../types/types'
import { TUser } from '../types/types'

import { useUpdateUserStyles, useProgressStyles } from '../styles/styles'

type TParams = {
  id: string
}

const EditUser: FunctionComponent = (props) => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

  const dispatch = useDispatch()
  const history = useHistory()
  const params: TParams = useParams()
  const userId = params.id

  const { usersList } = useSelector((state: TRootState) => state.users)

  const currentUser: TUser | undefined = usersList.find(({ id }: TUser) => id === userId)

  // useEffect(() => {
  //   if (usersList.length) {
  //     const currentUser: TUser | undefined = usersList.find(({ id }: TUser) => id === userId)
  //
  //     if (currentUser) {
  //       setCurrentUser(currentUser)
  //     }
  //   }
  //
  //   setIsLoading(false)
  // }, [ usersList, userId ])

  const [ handleInput, formState, setFormData ] = useForm()
  const { name, age, location, maritalStatus, children } = formState.inputFields

  /*useEffect(() => {
    const fetchUsersList = (): Promise<Array<TUser>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(usersList)
        }, 1000)
      })
    }

    const getUsersList = async (): Promise<void | null> => {
      const usersList: Array<TUser> = await fetchUsersList()
      const currentUser: TUser | undefined = usersList.find(({ id }: TUser) => id === userId)

      if (!currentUser) {
        return null
      }

      setCurrentUser(currentUser)
      setIsLoading(false)
    }

    getUsersList()

  }, [])*/

  useEffect(() => {
    if (!currentUser) {
      return
    }

    const { id, name, age, location, maritalStatus, children } = currentUser

    const formDataToUpdate = {
      id,
      inputFields: {
        name: { value: name },
        age: { value: age },
        location: { value: location },
        maritalStatus: { value: maritalStatus },
        children: { value: children },
      }
    }

    console.log('formDataToUpdate =>', formDataToUpdate)

    setFormData(formDataToUpdate)

    setIsLoading(false)
  }, [ currentUser ])

  const handleSubmit = (event: React.SyntheticEvent) => {
    console.log('handleSubmit =>', formState.inputFields)
    event.preventDefault()

    if (!currentUser) {
      return
    }

    const updatedUser = {
      id: currentUser.id,
      name: name.value,
      age: age.value,
      location: location.value,
      maritalStatus: maritalStatus.value,
      children: children.value
    }

    dispatch(updateUser({ ...updatedUser }))
    history.push('/')
  }

  const handleCancel = (event: SyntheticEvent): void => {
    event.preventDefault()
    history.push('/')
  }

  const updateUserClasses = useUpdateUserStyles()
  const progressClasses = useProgressStyles()

  return (
    <PageContainer>
      <>
        <h2>User page</h2>

        {
          isLoading ? (
            <div className={ progressClasses.progressContainer }>
              <CircularProgress />
            </div>
          ) : (
            <div>
              {
                !currentUser ? (
                  <p>Error: No user found</p>
                ) : (
                  <>
                    <form className={ updateUserClasses.form } onSubmit={ handleSubmit }>
                      <Box>
                        <CustomInput
                          id="name"
                          label="Name"
                          initialValue={ name.value }
                          handleInput={ handleInput }
                        />
                        <CustomInput
                          id="age"
                          type="number"
                          label="Age"
                          initialValue={ age.value }
                          handleInput={ handleInput }
                        />
                        <CustomInput
                          id="location"
                          label="Location"
                          initialValue={ location.value }
                          handleInput={ handleInput }
                        />
                      </Box>
                      <Box>
                        <CustomInput
                          id="maritalStatus"
                          label="Marital status"
                          select
                          options={ maritalStatuses }
                          initialValue={ maritalStatus.value }
                          handleInput={ handleInput }
                        />
                        <CustomInput
                          id="children"
                          type="number"
                          label="Children"
                          initialValue={ children.value }
                          handleInput={ handleInput }
                        />
                      </Box>
                      <Box>
                        <Button variant="contained" color="primary" className={ updateUserClasses.button } type="submit">
                          Submit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={ updateUserClasses.button }
                          onClick={ handleCancel }
                        >
                          Cancel
                        </Button>
                      </Box>
                    </form>
                  </>
                )
              }
            </div>
          )
        }
      </>
    </PageContainer>
  )
}

export default EditUser
