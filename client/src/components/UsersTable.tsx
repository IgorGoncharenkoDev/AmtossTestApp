import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'

import Table from './Table/Table'

import { TRootState } from '../types/types'

type TProps = {
	userQueryString: string
}

const UsersTable: FunctionComponent<TProps> = (props) => {
	const { userQueryString } = props

	const { usersList } = useSelector((state: TRootState) => state.users)

	const filteredUsers = usersList.filter(user => {
		let userMatchesTheQuery = false

		const userValues = Object.values(user)

		userValues.forEach(value => {
			if (value.toLowerCase().includes(userQueryString.toLowerCase())) {
				userMatchesTheQuery = true
			}

			return false
		})
		return userMatchesTheQuery
	})

	const userColumns = [ 'Name', 'Age', 'Location', 'Marital status', 'Children', '' ]

	return (
		<Table
			columns={ userColumns }
			data={ filteredUsers }
		/>
	)
}

export default UsersTable
