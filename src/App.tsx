import React, { useState, useCallback, FunctionComponent } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core'
import AppRoutes from './routes/routes'

import AuthContext from './contexts/authContext'

import Header from './components/Header'

import theme from './mui-theme'
import { useBaseStyles } from './styles/styles'
import './styles/styles.scss'


const App: FunctionComponent = () => {
	const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)
	const [ activeMenuTab, setActiveMenuTab ] = useState<number>(0)

	const classes = useBaseStyles()

	const login = useCallback(() => {
		setIsLoggedIn(true)
	}, [])

	const logout = useCallback(() => {
		setIsLoggedIn(false)
	}, [])

	return (
		<AuthContext.Provider value={ { isLoggedIn, login, logout } }>
			<MuiThemeProvider theme={ theme }>
				<div className={ classes.app }>
					<BrowserRouter>
						<Header
							activeMenuTab={ activeMenuTab }
							handleChangeMenuTab={ setActiveMenuTab }
						/>
						<main>
							<AppRoutes isLoggedIn={ isLoggedIn }/>
						</main>
					</BrowserRouter>
				</div>
			</MuiThemeProvider>
		</AuthContext.Provider>
	)
}

export default App
