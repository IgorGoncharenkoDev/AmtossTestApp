import { useCallback, useReducer } from 'react'

type TActionTypes = {
	[ key: string ]: string
}

const actionTypes: TActionTypes = {
	INPUT_CHANGE: 'INPUT_CHANGE',
	SET_DATA: 'SET_DATA'
}

type TValues = {
	[ key: string ]: {
		value: string,
		isValid: boolean
	}
}

type TUseForm = (initialValues: TValues, initialFormValidity: boolean) => [
	(id: string, value: string, initialFormValidity: boolean) => void,
	any,
	(initialInputs: TValues, initialFormValidity: boolean) => void
]

const useForm: TUseForm = (initialValues, initialFormValidity) => {
	const initialState = {
		inputs: initialValues,
		formIsValid: initialFormValidity
	}

	const reducer = (state: any, action: any) => {
		switch (action.type) {
			case actionTypes.INPUT_CHANGE:
				// eslint-disable-next-line no-case-declarations
				let formIsValid = true

				for (const inputId in state.inputs) {
					if (!state.inputs[inputId]) {
						continue
					}
					if (inputId === action.payload.id) {
						formIsValid = formIsValid && action.payload.isValid
					}
					else {
						formIsValid = formIsValid && state.inputs[inputId].isValid
					}
				}

				return {
					...state,
					inputs: {
						...state.inputs,
						[ action.payload.id ]: {
							value: action.payload.value,
							isValid: action.payload.isValid
						},
					},
					formIsValid: formIsValid
				}

			case actionTypes.SET_DATA:
				return {
					inputs: action.payload.inputs,
					formIsValid: action.payload.formIsValid
				}

			default:
				return state
		}
	}

	const [ state, dispatch ] = useReducer(reducer, initialState)

	const handleInput = useCallback((id: string, value: string, isValid: boolean): void => {
		dispatch({
			type: actionTypes.INPUT_CHANGE,
			payload: { id, value, isValid }
		})
	}, [])

	const setFormData = useCallback((initialInputs: TValues, initialFormValidity: boolean): void => {
		dispatch({
			type: actionTypes.SET_DATA,
			payload: {
				inputs: initialInputs,
				formIsValid: initialFormValidity
			}
		})
	}, [])

	return [ handleInput, state, setFormData ]
}

export default useForm
