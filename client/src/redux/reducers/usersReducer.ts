import { actionTypes } from '../actions/actionTypes'
import { usersListStub } from '../../stubs/stubs'
import updateUser from '../utils/updateUser'
import removeUser from '../utils/removeUser'

const initialState = {
	usersList: usersListStub
}

const usersReducer = (
	state: any = initialState,
	action: any
): any => {
	switch (action.type) {
		case actionTypes.ADD_USER:
			return {
				...state,
				usersList: [
					...state.usersList,
					action.payload
				]
			}

		case actionTypes.UPDATE_USER:
			return {
				...state,
				usersList: updateUser(state.usersList, action.payload)
			}

		case actionTypes.REMOVE_USER:
			return {
				...state,
				usersList: removeUser(state.usersList, action.payload)
			}

		default:
			return state
	}
}

export default usersReducer
