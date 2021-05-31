import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { CircularProgress } from '@material-ui/core'

import Table from './Table/Table'

import useUsers from '../hooks/useUsers'

type TProps = {
	userQueryString: string
}

const UsersTable: FunctionComponent<TProps> = (props) => {
	const { userQueryString } = props

	const { isLoading, filteredUsersList, errorMessage, retrieveUsers } = useUsers(userQueryString)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(retrieveUsers())
	}, [retrieveUsers])

	const userColumns = [ 'Name', 'Age', 'Location', 'Marital status', 'Children', '' ]

	return (
		<>
			{
				isLoading && (
					<CircularProgress />
				)
			}
			{
				errorMessage && (
					<p>{ errorMessage }</p>
				)
			}
			{
				filteredUsersList.length ? (
					<Table
						columns={ userColumns }
						data={ filteredUsersList }
					/>
				) : null
			}
		</>
	)
}

export default UsersTable
