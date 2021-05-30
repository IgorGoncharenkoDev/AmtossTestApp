import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Button } from '@material-ui/core'

import useUsers from '../../hooks/useUsers'

import { useTableStyles } from '../../styles/styles'

import { IUser } from '../../types/types'

interface IProps {
	data: Array<IUser>
}

const TableBody: FunctionComponent<IProps> = (props) => {
	const { data } = props
	const { push } = useHistory()
	const dispatch = useDispatch()
	const { deleteUser } = useUsers()

	const handleRedirectToUserEditPage = (id: string): void => {
		push(`/user/edit/${ id }`)
	}

	const handleRemove = (event: React.SyntheticEvent, userId: string) => {
		event.stopPropagation()
		dispatch(deleteUser(userId))
	}

	const classes = useTableStyles()

	return (
		<div>
			{
				data.length ? data.map((item: any, index: number) => {
					const { id, name, age, location, maritalStatus, children } = item

					return (
						<div
							className={ clsx(classes.tableRow, classes.tableBodyRow) }
							key={ index }
							onClick={ () => handleRedirectToUserEditPage(id) }
						>
							<div className={ classes.tableCell }>
								<span>{ name }</span>
							</div>
							<div className={ classes.tableCell }>
								<span>{ age }</span>
							</div>
							<div className={ classes.tableCell }>
								<span>{ location }</span>
							</div>
							<div className={ classes.tableCell }>
								<span>{ maritalStatus }</span>
							</div>
							<div className={ classes.tableCell }>
								<span>{ children }</span>
							</div>
							<div className={ classes.tableCell }>
								<Button
									variant="contained"
									color="secondary"
									onClick={ (event: React.SyntheticEvent) => handleRemove(event, id) }
								>
									Remove user
								</Button>
							</div>
						</div>
					)
				}) : (
					<div className={ clsx(classes.tableRow, classes.tableBodyRow) }>
						<div className={ classes.tableCell }>
							<p>No relevant data yet</p>
						</div>
					</div>

				)

			}
		</div>
	)
}

export default TableBody
