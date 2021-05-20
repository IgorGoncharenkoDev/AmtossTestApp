import React, { FunctionComponent } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'

type TProps = {
	isLogoutDialogOpen: boolean
	handleLogout: () => void
	handleLogoutDialogClose: () => void
}

const LogoutDialog: FunctionComponent<TProps> = (props) => {
	const { isLogoutDialogOpen, handleLogout, handleLogoutDialogClose } = props

	return (
		<Dialog
			open={ isLogoutDialogOpen }
			onClose={ handleLogoutDialogClose }
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
					onClick={ handleLogout }
				>
					Yes
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={ handleLogoutDialogClose }
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default LogoutDialog
