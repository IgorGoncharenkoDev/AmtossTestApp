import React, { useEffect, useState, FunctionComponent, ChangeEvent } from 'react'
import { TextField, MenuItem } from '@material-ui/core'

interface IProps {
	type?: string
	id: string
	label: string
	select?: boolean
	options?: Array<any>
	initialValue?: string
	handleInput: (id: string, value: string) => void
}

const CustomInput: FunctionComponent<IProps> = (props) => {
	const { type, id, label, select, options, initialValue, handleInput } = props

	const [ value, setValue ] = useState<string>('')

	useEffect(() => {
		if (initialValue) {
			setValue(initialValue)
		}

	}, [ initialValue ])

	useEffect(() => {
		handleInput(id, value)
	}, [ id, value, handleInput ])

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		event.preventDefault()
		setValue(event.target.value)
	}

	return (
		(select && options) ? (
			<TextField
				select
				id={ id }
				label={ label }
				variant="outlined"
				value={ value }
				onChange={ handleChange }
			>
				{
					options.map((option: string) =>
						<MenuItem key={ `martial-status-${ option }` } value={ option }>
							{ option }
						</MenuItem>
					)
				}
			</TextField>
		) : (
			<TextField
				id={ id }
				type={ type || 'text' }
				label={ label }
				variant="outlined"
				value={ value }
				onChange={ handleChange }
			/>
		)
	)
}

export default CustomInput
