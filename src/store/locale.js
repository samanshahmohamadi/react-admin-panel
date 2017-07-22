/**
 * Created by saman on 7/1/17.
 */
import {createAction, handleActions} from 'redux-actions'
const Config = require('Config')
// ------------------------------------
// Constants
// ------------------------------------
export const LOCALE_CHANGE = 'LOCALE_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export const localeChange = createAction(LOCALE_CHANGE, (value) => value)

export const actions = {
	localeChange
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
	[LOCALE_CHANGE]: (state, {payload}) => payload
}, Config.defaultLang)