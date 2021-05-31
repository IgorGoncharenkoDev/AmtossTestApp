import React, { useEffect, useReducer, FunctionComponent, ChangeEvent } from 'react'
import { TextField, MenuItem } from '@material-ui/core'
import { validate } from '../utils/validators'

interface IProps {
	type?: string
	id: string
	label: string
	select?: boolean
	options?: Array<any>
	initialValue?: string
	handleInput: (id: string, value: string, isValid: boolean) => void
	validators?: Array<any>
	isInitiallyValid?: boolean
	errorText?: string
}

const CustomInput: FunctionComponent<IProps> = (props) => {
	const { type, id, label, select, options, initialValue, handleInput,
		isInitiallyValid, validators, errorText } = props

	const actionTypes = {
		CHANGE: 'CHANGE',
		BLUR: 'BLUR',
		FOCUS: 'FOCUS'
	}

	const inputReducer = (state: any, action: any) => {
		switch (action.type) {
			case actionTypes.CHANGE:
				return {
					...state,
					value: action.payload.value,
					isValid: validate(action.payload.value, action.payload.validators)
				}
			case actionTypes.BLUR:
				return {
					...state,
					isBlurred: true,
					isFocused: false
				}
			case actionTypes.FOCUS:
				return {
					...state,
					isFocused: true
				}
			default:
				return state
		}
	}

	const initialState = {
		value: initialValue || '',
		isValid: isInitiallyValid || false,
		isBlurred: false,
		isFocused: false
	}

	const [ inputState, dispatch ] = useReducer(inputReducer, initialState)
	const { value, isValid, isBlurred, isFocused } = inputState

	useEffect(() => {
		handleInput(id, value, isValid)
	}, [ id, value, isValid, handleInput ])

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		event.preventDefault()
		dispatch({
			type: actionTypes.CHANGE,
			payload: {
				value: event.target.value,
				validators
			}
		})
	}

	const handleBlur = () => dispatch({ type: actionTypes.BLUR })

	const handleFocus = () => dispatch({ type: actionTypes.FOCUS })

	return (
		(select && options) ? (
			<TextField
				select
				id={ id }
				label={ label }
				variant="outlined"
				value={ value }
				onChange={ handleChange }
				onBlur={ handleBlur }
				onFocus={ handleFocus }
				error={ !isValid && isBlurred && !isFocused }
				helperText={ errorText }
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
				onBlur={ handleBlur }
				onFocus={ handleFocus }
				error={ !isValid && isBlurred && !isFocused }
				helperText={ errorText }
			/>
		)
	)
}

export default CustomInput
