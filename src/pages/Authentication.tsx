import React, { useContext, FunctionComponent, SyntheticEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { Paper, Box, Button } from '@material-ui/core'

import AuthContext from '../contexts/authContext'

import PageContainer from './PageContainer'
import CustomInput from '../components/CustomInput'

import useForm from '../hooks/useForm'

import { TAuthContext } from '../contexts/authContext'

import { useBaseStyles, useUserFormStyles } from '../styles/styles'

const Authentication: FunctionComponent = () => {
  const history = useHistory()
  const auth: TAuthContext = useContext(AuthContext)

  const [ handleInput, formState, setFormData ] = useForm({
    inputFields: {
      email: { value: '' },
      password: { value: '' },
    }
  })

  const handleFormSubmit = (event: SyntheticEvent): void => {
    event.preventDefault()

    const { email, password } = formState.inputFields

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
            />
            <CustomInput
              id="password"
              label="Password"
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
          </Box>
        </form>
      </Paper>
    </PageContainer>

  )
}

export default Authentication
