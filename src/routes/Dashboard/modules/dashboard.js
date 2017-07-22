import HttpRequest from '../../../utils/HttpRequest'

const Config = require('Config')

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DATA = 'GET_DATA'
// ------------------------------------
// Actions
// ------------------------------------
export function getData () {
	return (dispatch, getState) => {
		return new Promise((resolve) => {
			Promise.all([
				new HttpRequest().post('http://localhost:3001/dashboardData', {}),
				new HttpRequest().get('http://api.coindesk.com/v1/bpi/historical/close.json', {})
			])
				.then(payload => {
					let data = {}
					data.topBoxes = payload[0].data.topBoxes
					data.btcPrice = payload[1].data.bpi
					dispatch({
						type: GET_DATA,
						payload: data
					})
					resolve()
				})
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
	[GET_DATA]: (state, action) => ({
		...state,
		data: action.payload
	})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function factsReducer (state = initialState, action) {
	const handler = ACTION_HANDLERS[action.type]
	return handler ? handler(state, action) : state
}