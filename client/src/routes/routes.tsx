import React, { FunctionComponent } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Authentication, Landing, Logout, Home, ContactUs, NewUser, EditUser } from '../pages'

type TProps = {
	isLoggedIn: boolean
}

const AppRoutes: FunctionComponent<TProps> = (props) => {
	const { isLoggedIn } = props

	return (
		<Switch>
			<Route path="/contact-us" exact component={ ContactUs } />
			{
				isLoggedIn ? (
					<>
						<Route path="/" exact component={ Home } />
						<Route path="/user/new" component={ NewUser } />
						<Route path="/user/edit/:id" component={ EditUser } />
						<Route path="/logout" component={ Logout } />
					</>
				) : (
					<>
						<Route path="/" exact component={ Landing } />
						<Route path="/auth" exact component={ Authentication } />
						<Redirect to="/" />
					</>
				)
			}
		</Switch>
	)
}

export default AppRoutes
