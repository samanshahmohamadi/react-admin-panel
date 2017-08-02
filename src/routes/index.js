// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home'
import FactsRoute from './Facts'

import LoginLayout from '../layouts/LoginLayout/LoginLayout'
import LoginRoute from './Login'
import SignupRoute from './SignUp'
import ForgetPasswordRoute from './ForgetPassword'
import RecoverPasswordRoute from './RecoverPassword'

import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout'
import DashboardRoute from './Dashboard'
import AddStoreRoute from './AddStore'
import ListStoreRoute from './StoreList'
import StoreDetailRoute from './StoreDetail'

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ([{
	path: '/about',
	component: CoreLayout,
	indexRoute: Home,
	childRoutes: [
		FactsRoute(store)
	]
}, {
	path: '/',
	component: LoginLayout,
	indexRoute: LoginRoute(store),
	childRoutes: [
		SignupRoute(store),
		ForgetPasswordRoute(store),
		RecoverPasswordRoute(store)
	]
}, {
	path: '/dashboard',
	component: DashboardLayout,
	indexRoute: DashboardRoute(store),
	childRoutes: [
		{
			path: '/store',
			childRoutes: [
				AddStoreRoute(store),
				ListStoreRoute(store),
				StoreDetailRoute(store)
			]
		}
		// AddStoreRoute(store)
	]
}])

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
 require.ensure([], (require) => {
 cb(null, [
 // Remove imports!
 require('./Counter').default(store)
 ])
 })
 }

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */

export default createRoutes
