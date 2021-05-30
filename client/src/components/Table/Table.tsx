import React, { FunctionComponent } from 'react'

import TableHead from './TableHead'
import TableBody from './TableBody'

import { IUser } from '../../types/types'

interface IProps {
	columns: Array<string>
	data: Array<IUser>
}

const Table: FunctionComponent<IProps> = (props) => {
	const { columns, data } = props

	return (
		<div>
			<TableHead columns={ columns } />
			<TableBody data={ data } />
		</div>
	)
}

export default Table
