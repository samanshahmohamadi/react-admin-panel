import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import './LoginLayout.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import Navbar from '../../components/Navbar'
// import Footer from '../../components/Footer'
// import Utils from '../../utils/Utils'
import {lightBlue700, lightBlue400, deepPurple700, deepPurple300} from 'material-ui/styles/colors'
import {injectIntl} from 'react-intl'
import AlertContainer from 'react-alert'
import {store} from '../../main'


const muiTheme = getMuiTheme({
	fontFamily: 'Lato,Ubuntu,sans-serif',
	fontSize: 14,
	palette: {
		primary1Color: deepPurple700,
		primary2Color: deepPurple300,
		accent1Color: '#2abc73'
	},
	menuItem: {
		selectedTextColor: '#03A9F4'
	},
	appBar: {
		height: 120
	},
	toolbar: {
		titleFontSize: 16
	}
})

const mapStateToProps = (state) => ({
	alert: state.alert,
	// any props you need else
});

class LoginLayout extends React.Component {

	constructor(props) {
		super(props)
	}

	alertOptions = {
		offset: 14,
		position: 'bottom right',
		theme: 'light',
		time: 5000,
		transition: 'scale',
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.alert.show) {
			this.msg.show(nextProps.alert.text, {
				time: nextProps.alert.time,
				type: nextProps.alert.type,
				onClose: () => {
					store.dispatch(this.dispatchCloseAlert())
				}
			})
		}
	}

	dispatchCloseAlert = () => {
		return dispatch => {
			dispatch({
				type: 'CLOSE_ALERT',
				payload: 0
			})
		}
	}

	render() {
		return <MuiThemeProvider muiTheme={muiTheme}>
			<div dir={this.props.intl.formatMessage({id: 'layout.direction'})}>
				<div className='' style={{minHeight: '100vh'}}>
					<div>
						<AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
					</div>
					<div className='page-layout__viewport'>
						{this.props.children}
					</div>
				</div>
			</div>
		</MuiThemeProvider>
	}
}

LoginLayout.propTypes = {
	children: PropTypes.node
}
export default connect(mapStateToProps)(injectIntl(LoginLayout))
// export default injectIntl(LoginLayout)
// export default connect(mapStateToProps)(injectIntl(LoginLayout))
