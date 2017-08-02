/**
 * Created by saman on 7/18/17.
 */

export const requireAuth = (store) => (nextState, replace) => {
	const state = store.getState()
	if (nextState.location.pathname === '/') {
		return
	}
	if (!state.auth || !state.auth.isAuthenticated) {
		replace('/')
	}
}

export const requireNotAuth = (store) => (nextState, replace) => {
	const state = store.getState()
	if (state.auth && state.auth.isAuthenticated) {
		replace('/dashboard')
	}
}

export const requireAuthorization = (store) => (nextState, replace) => {
	const state = store.getState()
	if (nextState.location.pathname === '/') {
		return
	}
	if (!state.auth || !state.auth.isAuthenticated || !state.auth.user.isAdmin) {
		replace('/')
	}
}