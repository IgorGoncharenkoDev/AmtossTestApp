import React, { FunctionComponent, SyntheticEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Paper, Box, Button } from '@material-ui/core'
import { PageContainer } from './index'
import { maritalStatuses } from '../constants'
import CustomInput from '../components/CustomInput'
import useForm from '../hooks/useForm'
import useUsers from '../hooks/useUsers'
import { useBaseStyles, useUserFormStyles } from '../styles/styles'

const NewUser: FunctionComponent<Record<string, never>> = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const { createUser } = useUsers()

	const [ handleInput, formState ] = useForm({
		id: '',
		inputFields: {
			name: { value: '' },
			age: { value: '' },
			location: { value: '' },
			maritalStatus: { value: '' },
			children: { value: '' },
		},
	})

	const handleFormSubmit = (event: SyntheticEvent): void => {
		event.preventDefault()

		const { name, age, location, maritalStatus, children } = formState.inputFields

		const user = {
			name: name.value,
			age: age.value,
			location: location.value,
			maritalStatus: maritalStatus.value,
			children: children.value
		}

		dispatch(createUser(user))

		history.push('/')
	}

	const handleCancel = (event: SyntheticEvent): void => {
		event.preventDefault()
		history.push('/')
	}

	const baseClasses = useBaseStyles()
	const classes = useUserFormStyles()

	return (
		<PageContainer>
			<Paper elevation={ 3 } className={ baseClasses.paper }>
				<form className={ classes.form } onSubmit={ handleFormSubmit }>
					<Box>
						<CustomInput
							id="name"
							label="Name"
							handleInput={ handleInput }
						/>
						<CustomInput
							id="age"
							type="number"
							label="Age"
							handleInput={ handleInput }
						/>
						<CustomInput
							id="location"
							label="Location"
							handleInput={ handleInput }
						/>
					</Box>
					<Box>
						<CustomInput
							id="maritalStatus"
							label="Marital status"
							select
							options={ maritalStatuses }
							handleInput={ handleInput }
						/>
						<CustomInput
							id="children"
							type="number"
							label="Children"
							handleInput={ handleInput }
						/>
					</Box>
					<Box>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={ classes.button }
						>
							Submit
						</Button>
						<Button
							variant="contained"
							color="secondary"
							className={ classes.button }
							onClick={ handleCancel }
						>
							Cancel
						</Button>
					</Box>
				</form>
			</Paper>
		</PageContainer>
	)
}

export default NewUser
