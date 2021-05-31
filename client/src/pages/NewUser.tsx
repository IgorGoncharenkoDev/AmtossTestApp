import React, { FunctionComponent, SyntheticEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Paper, Box, Button } from '@material-ui/core'
import { PageContainer } from './index'
import { maritalStatuses } from '../constants'
import CustomInput from '../components/CustomInput'
import useForm from '../hooks/useForm'
import useUsers from '../hooks/useUsers'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../utils/validators'
import { useBaseStyles, useUserFormStyles } from '../styles/styles'

const NewUser: FunctionComponent<Record<string, never>> = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const { createUser } = useUsers()

	const [ handleInput, formState ] = useForm({
		name: { value: '', isValid: false },
		age: { value: '', isValid: false },
		location: { value: '', isValid: false },
		maritalStatus: { value: '', isValid: false },
		children: { value: '', isValid: false },
	}, false)

	const handleFormSubmit = (event: SyntheticEvent): void => {
		event.preventDefault()

		const { name, age, location, maritalStatus, children } = formState.inputs

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
							validators={ [ VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2) ] }
							errorText="Please, enter a valid name"
						/>
						<CustomInput
							id="age"
							type="number"
							label="Age"
							handleInput={ handleInput }
							validators={ [ VALIDATOR_REQUIRE() ] }
							errorText="Please, enter a valid age"
						/>
						<CustomInput
							id="location"
							label="Location"
							handleInput={ handleInput }
							validators={ [ VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2) ] }
							errorText="Please, enter a valid location"
						/>
					</Box>
					<Box>
						<CustomInput
							id="maritalStatus"
							label="Marital status"
							select
							options={ maritalStatuses }
							handleInput={ handleInput }
							validators={ [ VALIDATOR_REQUIRE() ] }
							errorText="Please, select your marital status"
						/>
						<CustomInput
							id="children"
							type="number"
							label="Children"
							handleInput={ handleInput }
							validators={ [ VALIDATOR_REQUIRE() ] }
							errorText="Please, enter a valid number"
						/>
					</Box>
					<Box>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={ classes.button }
							disabled={ !formState.formIsValid }
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
