import { actionTypes } from '../actions/actionTypes'
import { IUser } from '../../types/types'
import updateUser from '../utils/updateUser'
import removeUser from '../utils/removeUser'

interface IState {
	usersList: Array<IUser>
	isLoading: boolean
	errorMessage: string
}

const initialState = {
	usersList: [],
	isLoading: false,
	errorMessage: ''
}

const usersReducer = (state: IState = initialState, action: any): any => {
	switch (action.type) {
		case actionTypes.FETCH_USERS_START:
		case actionTypes.ADD_USER_START:
		case actionTypes.EDIT_USER_START:
		case actionTypes.REMOVE_USER_START:
			return {
				...state,
				isLoading: true
			}
		case actionTypes.FETCH_USERS_FAILURE:
		case actionTypes.ADD_USER_FAILURE:
		case actionTypes.EDIT_USER_FAILURE:
		case actionTypes.REMOVE_USER_FAILURE:
			return {
				...state,
				isLoading: false,
				errorMessage: action.payload.errorMessage
			}
		case actionTypes.FETCH_USERS_SUCCESS:
			return {
				...state,
				usersList: action.payload,
				isLoading: false
			}
		case actionTypes.ADD_USER_SUCCESS:
			return {
				...state,
				usersList: [ ...state.usersList, action.payload ],
				errorMessage: ''
			}
		case actionTypes.EDIT_USER_SUCCESS:
			return {
				...state,
				usersList: updateUser(state.usersList, action.payload),
				isLoading: false
			}
		case actionTypes.REMOVE_USER_SUCCESS:
			return {
				...state,
				usersList: removeUser(state.usersList, action.payload),
				isLoading: false
			}

		default:
			return state
	}
}

export default usersReducer
