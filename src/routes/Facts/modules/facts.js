import HttpRequest from '../../../utils/HttpRequest'

const Config = require('Config')

// ------------------------------------
// Constants
// ------------------------------------
export const FACTS = 'FACTS'
//export const LOGGED_IN = 'LOGGED_IN'
// ------------------------------------
// Actions
// ------------------------------------
export function getFacts () {
	return (dispatch, getState) => {
		return new Promise((resolve) => {
			dispatch({
				type: FACTS,
				payload: {
					"quote": "Beatbullying's 'The Big March 2012' is such a brilliant campaign and I am very proud to be a part of it. I have been a victim of cyber bullying myself and I know firsthand just how hurtful it can be. People think that they can hide behind computers and send nasty and hurtful comments to people, and this is wrong.",
					"author": "Katherine Jenkins",
					"cat": "computers"
				}
			})
			resolve()
			/*return new HttpRequest().get(Config.apiUrl + "/random", {})
			 .then(payload => {
			 dispatch({
			 type: FACTS,
			 payload: payload.data
			 })
			 resolve()
			 })*/
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
	[FACTS]: (state, action) => ({
		...state,
		facts: action.payload
	})
	/*[LOGGED_IN]: (state, action) => ({
	 ...state,
	 isLogin: true,
	 user: action.payload
	 })*/
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function factsReducer (state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}
