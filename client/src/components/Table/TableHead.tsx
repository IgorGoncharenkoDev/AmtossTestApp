import React, { FunctionComponent } from 'react'
import clsx from 'clsx'
import { useTableStyles } from '../../styles/styles'

interface IProps {
	columns: Array<string>
}

const TableHead: FunctionComponent<IProps> = (props) => {
	const classes = useTableStyles()

	return (
		<div>
			<div className={ classes.tableRow }>
				{
					props.columns.map((item: string, index) => (
						<div className={ clsx(classes.tableCell, classes.tableHeaderCell,) } key={ index }>
							<span>{ item }</span>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default TableHead
