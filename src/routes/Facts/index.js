import {injectReducer} from '../../store/reducers'
import {requireAuth} from '../Policy'

export default (store) => ({
	path: 'facts',
	onEnter: requireAuth(store),
	/*  Async getComponent is only invoked when route matches   */
	getComponent (nextState, cb) {
		/*  Webpack - use 'require.ensure' to create a split point
		 and embed an async module loader (jsonp) when bundling   */
		require.ensure([], (require) => {
			/*  Webpack - use require callback to define
			 dependencies for bundling   */
			const Facts = require('./containers/FactsContainer').default
			const reducer = require('./modules/facts').default

			/*  Add the reducer to the store on key 'counter'  */
			injectReducer(store, {key: 'facts', reducer})

			/*  Return getComponent   */
			cb(null, Facts)

			/* Webpack named bundle   */
		}, 'facts')
	}
})
