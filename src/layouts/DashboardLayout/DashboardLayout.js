import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {browserHistory, Link} from 'react-router'
import './DashboardLayout.scss'
import HttpRequest from '../../utils/HttpRequest'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
// import FlatButton from 'material-ui/FlatButton'
// import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import AlertContainer from 'react-alert'

// import IconButton from 'material-ui/IconButton'
// import IconMenu from 'material-ui/IconMenu'
import HomeSVG from 'material-ui/svg-icons/action/home'
import ReportSVG from 'material-ui/svg-icons/editor/format-list-bulleted'
import StoreSVG from 'material-ui/svg-icons/places/business-center'
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import RightMenu from '../../components/RightMenu'
// import Navbar from '../../components/Navbar'
// import Footer from '../../components/Footer'
// import Utils from '../../utils/Utils'
import {
	white,
	deepPurple300,
	lightBlue400,
	lightBlueA100,
	grey700,
	lightBlueA200,
	blueGrey50,
	lightBlue700,
	deepPurple700
} from 'material-ui/styles/colors'
import {injectIntl} from 'react-intl'
import {actions as localeActions} from '../../store/locale'
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
		height: 80,
		color: deepPurple700
	},
	toolbar: {
		titleFontSize: 16
	},
	drawer: {
		width: 250,
		color: white
	}
})

const leftDrawerItemStyle = {fontWeight: 'bold', color: deepPurple700}

const mapStateToProps = (state) => ({
	locale: state.locale,
	alert: state.alert,
	user: state.auth.user
})

class DashboardLayout extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			leftDrawerOpen: true,
			containerWidth: 'calc(100% - ' + muiTheme.drawer.width + 'px)',
			containerMarginLeft: muiTheme.drawer.width + 10 + 'px'
		}
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

	handleLeftDrawerBtnClick() {
		this.setState({leftDrawerOpen: !this.state.leftDrawerOpen})
		if (!this.state.leftDrawerOpen) {
			this.setState({
				containerWidth: 'calc(100% - ' + muiTheme.drawer.width + 'px)',
				containerMarginLeft: muiTheme.drawer.width + 10 + 'px'
			})
		} else {
			this.setState({containerWidth: '100%', containerMarginLeft: 0})
		}
	}

	componentDidMount() {
	}

	render() {
		console.log(this.props.user.isAdmin)
		return <MuiThemeProvider muiTheme={muiTheme}>
			<div style={{backgroundColor: blueGrey50, minHeight: '100vh', paddingBottom: '10%'}}
			     dir={this.props.intl.formatMessage({id: 'layout.direction'})}>
				<AppBar
					dir={this.props.intl.formatMessage({id: 'layout.direction'})}
					style={{position: 'fixed'}}
					iconClassNameRight="muidocs-icon-navigation-expand-more"
					iconElementRight={<RightMenu/>}
					title={this.props.intl.formatMessage({id: 'appBar.title'})}
					onLeftIconButtonTouchTap={this.handleLeftDrawerBtnClick.bind(this)}
				/>
				{this.props.user && this.props.user.isAdmin !== undefined ?
					<Drawer containerStyle={{zIndex: 1}} open={this.state.leftDrawerOpen}>
						<div style={{height: muiTheme.appBar.height}}/>
						<List>
							<Link to="/dashboard">
								<ListItem style={leftDrawerItemStyle} primaryText="Home"
								          leftIcon={<HomeSVG style={{fill: deepPurple700}}/>}/>
							</Link>
							<Divider />
							<ListItem style={leftDrawerItemStyle} primaryText="Reports"
							          leftIcon={<ReportSVG style={{fill: deepPurple700}}/>}/>
							<Divider/>
							{!JSON.parse(this.props.user.isAdmin) ? (
								<Link to="/store/add">
									<ListItem style={leftDrawerItemStyle} primaryText="Add Store"
									          leftIcon={<StoreSVG style={{fill: deepPurple700}}/>}/>
									<Divider />
								</Link>
							) : (
								null
							)}
							{JSON.parse(this.props.user.isAdmin) ? (
								<Link to="/store/list">
									<ListItem style={leftDrawerItemStyle} primaryText="List Stores"
									          leftIcon={<StoreSVG style={{fill: deepPurple700}}/>}/>
									<Divider />
								</Link>
							) : (
								null
							)}
						</List>
					</Drawer> : null
				}
				<div className='container' style={{
					paddingTop: muiTheme.appBar.height,
					height: 'calc(100vh' - muiTheme.appBar.height + 'px)',
					marginLeft: this.state.containerMarginLeft,
					paddingRight: '40px',
					width: this.state.containerWidth
				}}>
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

DashboardLayout.propTypes = {
	children: PropTypes.node
}
export default connect(mapStateToProps, Object.assign({}, localeActions))(injectIntl(DashboardLayout))
