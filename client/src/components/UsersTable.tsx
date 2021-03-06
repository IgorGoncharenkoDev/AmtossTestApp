import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'

import Table from './Table/Table'

import useUsers from '../hooks/useUsers'

type TProps = {
	userQueryString: string
}

const UsersTable: FunctionComponent<TProps> = (props) => {
	const { userQueryString } = props

	const { filteredUsersList, retrieveUsers } = useUsers(userQueryString)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(retrieveUsers())
	}, [retrieveUsers])

	const userColumns = [ 'Name', 'Age', 'Location', 'Marital status', 'Children', '' ]

	return (
		<Table
			columns={ userColumns }
			data={ filteredUsersList }
		/>
	)
}

export default UsersTable
