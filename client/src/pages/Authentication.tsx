import React, { useContext, FunctionComponent, SyntheticEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { Paper, Box, Button } from '@material-ui/core'
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../utils/validators'

import AuthContext from '../contexts/authContext'

import PageContainer from './PageContainer'
import CustomInput from '../components/CustomInput'

import useForm from '../hooks/useForm'

import { TAuthContext } from '../contexts/authContext'

import { useBaseStyles, useUserFormStyles } from '../styles/styles'

const Authentication: FunctionComponent = () => {
	const history = useHistory()
	const auth: TAuthContext = useContext(AuthContext)

	const [ handleInput, formState ] = useForm({
		email: { value: '', isValid: false },
		password: { value: '', isValid: false },
	}, false)

	const handleFormSubmit = (event: SyntheticEvent): void => {
		event.preventDefault()

		const { email, password } = formState.inputs

		console.log(`User logged in with email: '${ email }' and password: '${ password }'`)

		auth.login()
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
							id="email"
							label="Email"
							handleInput={ handleInput }
							validators={ [ VALIDATOR_REQUIRE(), VALIDATOR_EMAIL() ] }
							errorText="Please, enter a valid email"
						/>
						<CustomInput
							id="password"
							label="Password"
							handleInput={ handleInput }
							validators={ [ VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6) ] }
							errorText="Please, enter a valid password"
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
					</Box>
				</form>
			</Paper>
		</PageContainer>

	)
}

export default Authentication
