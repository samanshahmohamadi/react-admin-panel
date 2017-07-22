import React from 'react'
import {browserHistory, Router} from 'react-router'
import {Provider} from 'react-redux'
import PropTypes from 'prop-types'
import injectTapEventPlugin from 'react-tap-event-plugin';

import {IntlProvider} from 'react-intl'
import * as messages from '../i18n/'

import {connect} from 'react-redux'


// Needed for onTouchTap
try {
	injectTapEventPlugin();
} catch (e) {

}

class App extends React.Component {
	static propTypes = {
		// store: PropTypes.object.isRequired,
		routes: PropTypes.array.isRequired,
		store: PropTypes.object.isRequired,
		locale: PropTypes.string.isRequired
	}

	/*shouldComponentUpdate() {
	 return true
	 }*/

	render () {
		const intlData = {
			locale: this.props.locale,
			messages: messages[this.props.locale]
		}
		return (
			<Provider store={this.props.store}>
				<div style={{height: '100%'}}>
					<IntlProvider {...intlData}>
						<Router history={browserHistory} children={this.props.routes}/>
					</IntlProvider>
				</div>
			</Provider>
		)
	}
}
function mapStateToProps (state) {
	return {locale: state.locale}
}
export default connect(mapStateToProps)(App)
// export default App
