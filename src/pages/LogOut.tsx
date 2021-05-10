import React, { useEffect, useState, useContext, FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'

import AuthContext from '../contexts/authContext'

import PageContainer from './PageContainer'

const Logout: FunctionComponent = () => {
  const history = useHistory()

  const [ isDialogOpen, setIsDialogOpen ] = useState<boolean>(true)

  const auth = useContext(AuthContext)
  const { isLoggedIn, logout } = auth

  useEffect(() => {
    if (isLoggedIn) {
      // logout()
    }
  }, [ isLoggedIn ])

  const handleDialogOpen = () =>
    setIsDialogOpen(true)

  const handleDialogClose = () =>
    history.push('/')

  return (
    <PageContainer>
      <Dialog
        open={ isDialogOpen }
        onClose={ handleDialogClose }
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">
          Are you sure you want to logout?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Click "Yes" if you really want to logout,
            otherwise you may click "No"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={ handleDialogOpen }
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={ handleDialogClose }
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  )
}

export default Logout
