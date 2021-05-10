import React, { useState, Fragment, FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'

import { PageContainer } from '../pages'
import UsersTable from '../components/UsersTable'
import { Box, TextField, Button, Typography } from '@material-ui/core'

import { usePageStyles } from '../styles/styles'


const Home: FunctionComponent = () => {
  const [ userQueryString, setUserQueryString ] = useState<string>('')

  const history = useHistory()

  const classes = usePageStyles()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string
    setUserQueryString(value.toLowerCase())
  }

  return (
    <PageContainer>
      <Fragment>
        <Box mb={ 4 } display="flex" alignItems="center">
          <Typography className={ classes.pageTitle }>
            Users
          </Typography>
          <Box ml={ 5 }>
            <Button
              variant="contained"
              color="primary"
              onClick={ () => history.push('/user/new') }
            >
              Add new user
            </Button>
          </Box>
          <Box ml="auto">
            <TextField
              id="search-user"
              type="search"
              label="Search user"
              variant="outlined"
              onChange={ handleSearchChange }
              classes={{ root: classes.searchInput }}
            />
          </Box>
        </Box>
        <UsersTable userQueryString={ userQueryString } />
      </Fragment>
    </PageContainer>
  )
}

export default Home
