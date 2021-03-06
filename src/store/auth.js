/**
 * Created by saman on 7/18/17.
 */
import {browserHistory} from 'react-router'

const Config = require('Config')

// ------------------------------------
// Constants
// ------------------------------------
export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'
export const UPDATE_USER = 'UPDATE_USER'

// ------------------------------------
// Actions
// ------------------------------------
export const logout = () => {
	return (dispatch, getState) => {
		return new Promise((resolve) => {
			localStorage.clear()
			dispatch({
				type: LOGGED_OUT,
				payload: {}
			})
			browserHistory.push('/')
			resolve()
		})
	}
}

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk! */

export const actions = {}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[LOGGED_IN]: (state, action) => ({
		isAuthenticated: true,
		user: action.payload
	}),
	[LOGGED_OUT]: (state, action) => ({
		isAuthenticated: false,
		user: {}
	}),
	[UPDATE_USER]: (state, action) => ({
		isAuthenticated: true,
		user: {...state.user, ...{[action.payload.key]: action.payload.value}}
	})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function authReducer(state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
