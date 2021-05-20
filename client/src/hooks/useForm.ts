import { useCallback, useReducer } from 'react'

type TActionTypes = {
	[ key: string ]: string
}

const actionTypes: TActionTypes = {
	INPUT_CHANGE: 'INPUT_CHANGE',
	SET_DATA: 'SET_DATA'
}

type TValues = {
	id?: string
	inputFields: {
		[ key: string ]: {
			value: string
		}
	}
}

const useForm = (initialValues: TValues): [(id: string, value: string) => void, TValues, (formData: TValues) => void] => {
	const initialState = initialValues

	const reducer = (state: any, action: any) => {
		switch (action.type) {
			case actionTypes.INPUT_CHANGE:
				return {
					...state,
					inputFields: {
						...state.inputFields,
						[ action.payload.id ]: {
							value: action.payload.value,
						},
					}
				}

			case actionTypes.SET_DATA:
				return {
					inputFields: action.payload.inputFields
				}

			default:
				return state
		}
	}

	const [ state, dispatch ] = useReducer(reducer, initialState)

	const handleInput = useCallback((id: string, value: string): void => {
		dispatch({
			type: actionTypes.INPUT_CHANGE,
			payload: { id, value }
		})
	}, [])

	const setFormData = useCallback((formData: TValues): void => {
		dispatch({
			type: actionTypes.SET_DATA,
			payload: formData
		})
	}, [])

	return [ handleInput, state, setFormData ]
}

export default useForm
