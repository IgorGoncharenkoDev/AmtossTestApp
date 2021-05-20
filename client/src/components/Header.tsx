import React, { useEffect, useMemo, useCallback, useContext, FunctionComponent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Container, Grid, AppBar, Tabs, Tab, Button } from '@material-ui/core'

import AuthContext, { TAuthContext } from '../contexts/authContext'

import LogoutDialog from './Dialogs/LogoutDialog'

import { getMenu } from '../utils/getMenu'

import { useHeaderStyles } from '../styles/styles'

type TProps = {
	activeMenuTab: number
	handleChangeMenuTab: (value: number) => void
}

type TMenuRoute = {
	name: string
	link: string
	activeTab: number
}

const Header: FunctionComponent<TProps> = (props) => {
	const { activeMenuTab, handleChangeMenuTab } = props

	const history = useHistory()

	const [ isDialogOpen, setIsDialogOpen ] = useState<boolean>(false)

	const auth: TAuthContext = useContext(AuthContext)
	const { isLoggedIn, logout } = auth

	const menuRoutes: Array<TMenuRoute> = useMemo(() =>
		getMenu(isLoggedIn), [ isLoggedIn ])

	useEffect(() => {
		[ ...menuRoutes ].forEach((route: TMenuRoute) => {
			switch (window.location.pathname) {
				case route.link:
					// checking if the current 'value' has already been set correctly
					// by checking the 'activeMenuTab' property on the current route
					if (route.activeTab !== activeMenuTab) {
						handleChangeMenuTab(route.activeTab)
					}
					break

				default:
					break
			}
		})
	}, [ activeMenuTab, menuRoutes ])

	const handleLogout = useCallback(() => {
		setIsDialogOpen(false)
		logout()
	}, [])

	const handleAuthenticate = (): void => {
		history.push('/auth')
	}

	const handleDialogOpen = (): void => {
		setIsDialogOpen(true)
	}

	const handleDialogClose = useCallback(() => {
		setIsDialogOpen(false)
	}, [])

	const headerClasses = useHeaderStyles()

	return (
		<>
			<AppBar position="static">
				<Container maxWidth="lg">
					<Grid container alignItems="center">
						<Grid item>
							<Tabs
								value={ activeMenuTab }
								onChange={ (event: React.ChangeEvent<Record<string, never>>, value: number) => handleChangeMenuTab(value) }
							>
								{
									menuRoutes.map(({ name, link }: TMenuRoute, index: number) => (
										<Tab
											key={ `tab-${ index }-${ name }` }
											label={ name }
											to={ link }
											component={ Link }
										/>
									))
								}
							</Tabs>
						</Grid>

						{
							isLoggedIn ? (
								<Grid item style={ { marginLeft: 'auto ' } }>
									<Button
										variant="outlined"
										color="default"
										onClick={ handleDialogOpen }
										classes={ { root: headerClasses.logoutButton } }
									>
										Logout
									</Button>
								</Grid>
							) : (
								<Grid item style={ { marginLeft: 'auto ' } }>
									<Button
										variant="outlined"
										color="default"
										onClick={ handleAuthenticate }
										classes={ { root: headerClasses.logoutButton } }
									>
										Authenticate
									</Button>
								</Grid>
							)
						}


					</Grid>
				</Container>
			</AppBar>
			<LogoutDialog
				isLogoutDialogOpen={ isDialogOpen }
				handleLogout={ handleLogout }
				handleLogoutDialogClose={ handleDialogClose }
			/>
		</>

	)
}

export default Header
