import {injectReducer} from '../../store/reducers'
import {requireNotAuth} from '../Policy'

export default (store) => ({
	path: 'signup',
	onEnter: requireNotAuth(store),
	/*  Async getComponent is only invoked when route matches   */
	getComponent (nextState, cb) {
		/*  Webpack - use 'require.ensure' to create a split point
		 and embed an async module loader (jsonp) when bundling   */
		require.ensure([], (require) => {
			/*  Webpack - use require callback to define
			 dependencies for bundling   */
			const SignUp = require('./containers/SignUpContainer').default
			const reducer = require('./modules/signup').default

			/*  Add the reducer to the store on key 'counter'  */
			injectReducer(store, {key: 'signup', reducer})

			/*  Return getComponent   */
			cb(null, SignUp)

			/* Webpack named bundle   */
		}, 'signup')
	}
})
