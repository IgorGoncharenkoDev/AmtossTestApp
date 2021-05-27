import React, { FunctionComponent } from 'react'

import Table from './Table/Table'

import useUsers from '../hooks/useUsers'

type TProps = {
	userQueryString: string
}

const UsersTable: FunctionComponent<TProps> = (props) => {
	const { userQueryString } = props

	const { filteredUsersList } = useUsers(userQueryString)

	const userColumns = [ 'Name', 'Age', 'Location', 'Marital status', 'Children', '' ]

	return (
		<Table
			columns={ userColumns }
			data={ filteredUsersList }
		/>
	)
}

export default UsersTable
