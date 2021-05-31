import React, { useState, useEffect, FunctionComponent, SyntheticEvent } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CircularProgress, Box, Button } from '@material-ui/core'

import { PageContainer } from './index'
import CustomInput from '../components/CustomInput'

import useForm from '../hooks/useForm'
import useUsers from '../hooks/useUsers'

import { maritalStatuses } from '../constants'

import { IUser } from '../types/types'

import { useUserFormStyles, useProgressStyles } from '../styles/styles'
import { VALIDATOR_REQUIRE } from '../utils/validators'

type TParams = {
	id: string
}

const EditUser: FunctionComponent = () => {
	const [ isLoading, setIsLoading ] = useState<boolean>(true)

	const dispatch = useDispatch()
	const history = useHistory()
	const params: TParams = useParams()
	const userId = params.id

	const { retrieveUser, getCurrentUser, updateUser } = useUsers()
	const currentUser: IUser | undefined = getCurrentUser(userId)

	const [ handleInput, formState, setFormData ] = useForm({
		name: { value: '', isValid: false },
		age: { value: '', isValid: false },
		location: { value: '', isValid: false },
		maritalStatus: { value: '', isValid: false },
		children: { value: '', isValid: false },
	},
	false
	)


	const { name, age, location, maritalStatus, children } = formState.inputs

	useEffect(() => {
		dispatch(retrieveUser(userId))
	}, [ retrieveUser, userId ])

	useEffect(() => {
		if (!currentUser) {
			return
		}

		const { name, age, location, maritalStatus, children } = currentUser

		setFormData({
			name: { value: name, isValid: true },
			age: { value: age, isValid: true },
			location: { value: location, isValid: true },
			maritalStatus: { value: maritalStatus, isValid: true },
			children: { value: children, isValid: true },
		}, true)

		setIsLoading(false)
	}, [ currentUser ])

	const handleSubmit = (event: React.SyntheticEvent) => {
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

		dispatch(updateUser(currentUser.id, { ...updatedUser }))
		history.push('/')
	}

	const handleCancel = (event: SyntheticEvent): void => {
		event.preventDefault()
		history.push('/')
	}

	const updateUserClasses = useUserFormStyles()
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
													validators={ [ VALIDATOR_REQUIRE() ] }
													isInitiallyValid={ name.isValid }
													errorText="Please, enter a valid name"
												/>
												<CustomInput
													id="age"
													type="number"
													label="Age"
													initialValue={ age.value }
													handleInput={ handleInput }
													validators={ [ VALIDATOR_REQUIRE() ] }
													isInitiallyValid={ age.isValid }
													errorText="Please, enter a valid age"
												/>
												<CustomInput
													id="location"
													label="Location"
													initialValue={ location.value }
													handleInput={ handleInput }
													validators={ [ VALIDATOR_REQUIRE() ] }
													isInitiallyValid={ location.isValid }
													errorText="Please, enter a valid location"
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
													validators={ [ VALIDATOR_REQUIRE() ] }
													isInitiallyValid={ maritalStatus.isValid }
													errorText="Please, select your marital status"
												/>
												<CustomInput
													id="children"
													type="number"
													label="Children"
													initialValue={ children.value }
													handleInput={ handleInput }
													validators={ [ VALIDATOR_REQUIRE() ] }
													isInitiallyValid={ children.isValid }
													errorText="Please, enter a valid number"
												/>
											</Box>
											<Box>
												<Button
													variant="contained"
													color="primary"
													className={ updateUserClasses.button }
													type="submit"
													disabled={ !formState.formIsValid }
												>
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
