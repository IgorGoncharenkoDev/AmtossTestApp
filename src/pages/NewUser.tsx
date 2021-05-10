import React, { FunctionComponent, SyntheticEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Box, Button, Paper } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { v4 as uuidv4 } from 'uuid'

import { PageContainer } from '../pages'
import { maritalStatuses } from '../constants'
import CustomInput from '../components/CustomInput'
import useForm from '../hooks/useForm'

import { useBaseStyles } from '../styles/styles'
import { addUser } from '../redux/actions/userActions'

interface IProps {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      }
    },
    button: {
      margin: theme.spacing(1),
    }
  }),
)

const NewUser: FunctionComponent<IProps> = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [ handleInput, formState ] = useForm()

  const handleFormSubmit = (event: SyntheticEvent): void => {
    event.preventDefault()

    const { name, age, location, maritalStatus, children } = formState.inputFields

    const user = {
      id: uuidv4(),
      name: name.value,
      age: age.value,
      location: location.value,
      maritalStatus: maritalStatus.value,
      children: children.value
    }

    dispatch(addUser(user))

    history.push('/')
  }

  const handleCancel = (event: SyntheticEvent): void => {
    event.preventDefault()
    history.push('/')
  }

  const baseClasses = useBaseStyles()
  const classes = useStyles()

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
            <Button variant="contained" color="primary" className={ classes.button } type="submit">
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
