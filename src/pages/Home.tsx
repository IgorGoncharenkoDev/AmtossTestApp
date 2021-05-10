import React, { Fragment, FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'

import { PageContainer } from '../pages'
import UsersTable from '../components/UsersTable'
import { Box, Button, Typography } from '@material-ui/core'

import { usePageStyles } from '../styles/styles'


const Home: FunctionComponent = () => {
  const history = useHistory()

  const classes = usePageStyles()

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
        </Box>
        <UsersTable />
      </Fragment>
    </PageContainer>
  )
}

export default Home
