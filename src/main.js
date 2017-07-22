import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import './styles/main.scss'

import {addLocaleData} from 'react-intl'
import en from 'react-intl/locale-data/en'
import fa from 'react-intl/locale-data/fa'
import ru from 'react-intl/locale-data/ru'


//import './styles/bootstrap.min.css'
// Store Initialization
// ------------------------------------
export const store = createStore(window.__INITIAL_STATE__)

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

const isAuth = localStorage.getItem('isAuth')
if (isAuth) {
	store.dispatch({
		type: 'LOGGED_IN',
		payload: {}
	})
}

let render = () => {
	const App = require('./components/App').default
	const routes = require('./routes/index').default(store)
	// All modern browsers, expect `Safari`, have implemented
	// the `ECMAScript Internationalization API`.
	// For that we need to patch in on runtime.
	if (!global.Intl) {
		require.ensure(['intl'], require => {
			require('intl')
		}, 'IntlBundle')
	}
	ReactDOM.render(
		<App store={store} routes={routes}/>,
		MOUNT_NODE
	)
}

addLocaleData(en)
addLocaleData(fa)
addLocaleData(ru)

// Development Tools
// ------------------------------------
if (__DEV__) {
	if (module.hot) {
		const renderApp = render
		const renderError = (error) => {
			const RedBox = require('redbox-react').default

			ReactDOM.render(<RedBox error={error}/>, MOUNT_NODE)
		}

		render = () => {
			try {
				renderApp()
			} catch (e) {
				console.error(e)
				renderError(e)
			}
		}

		// Setup hot module replacement
		module.hot.accept([
				'./components/App',
				'./routes/index',
			], () =>
				setImmediate(() => {
					ReactDOM.unmountComponentAtNode(MOUNT_NODE)
					render()
				})
		)
	}
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()