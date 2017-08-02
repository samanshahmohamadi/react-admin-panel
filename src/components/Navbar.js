/**
 * Created by saman on 6/6/17.
 */
import React from 'react';
import {connect} from 'react-redux'
import {IndexLink} from 'react-router'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import HttpRequest from '../utils/HttpRequest'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SideDrawer from './Drawer'
import largeLogo from '../../public/logo.png'
import PropTypes from 'prop-types'
import {injectIntl, intlShape} from 'react-intl';
import {browserHistory, withRouter} from 'react-router'
import {push} from 'react-router-redux';
import {Link} from 'react-router'
import Login from './Login'

// import {localeChange} from '../store/locale'
import {actions as localeActions} from '../store/locale'

const Config = require('Config')

const mapStateToProps = (state) => ({
	locale: state.locale,
	isAuth: state.auth.isAuthenticated
})

import {store} from '../main';

import Snackbar from 'material-ui/Snackbar';


class Navbar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			snackOpen: false,
			searchParam: ''
		};
	}

	onClick = () => {
		this.Drawer.handleToggle() // do stuff
	}

	handleLangChange = (e, index, value) => {
		this.props.localeChange(value)
	}

	paramChange = (e) => {
		this.setState({searchParam: e.target.value})
	}


	search = (e) => {
		e.preventDefault();
		new HttpRequest().get(Config.apiUrl + "/search", {param: this.state.searchParam.toString()})
			.then(payload => {
				console.log(payload)
			})
			.catch(err => {
				this.setState({snackOpen: true, searchParam: ''})
				setTimeout(() => {
					this.setState({snackOpen: false})
				}, 4000)
			})
	}

	handleLogout = () => {
		localStorage.clear()
		store.dispatch(this.dispatchLogout())
		browserHistory.push('/')
		/*new HttpRequest().get(Config.apiUrl + "/logout", {
			username: this.state.username
		})
			.then(payload => {
				localStorage.clear()
				store.dispatch(this.dispatchLogout())
			})
			.catch(err => {
				alert('Logout Failed!')
			})*/
		//this.props.loginStateChange(true);
	};

	dispatchLogout = () => {
		return dispatch => {
			dispatch({
				type: 'LOGGED_OUT',
				payload: {}
			})
		}
	}

	render() {
		let isAuth = store.getState().auth.isAuthenticated
		let authBtn
		if (this.props.isAuth) {
			authBtn = <FlatButton labelStyle={{fontWeight: 'bold', color: '#ffffff'}} label="Logout"
			                      onTouchTap={this.handleLogout}/>
		} else {
			authBtn = <Login/>
		}
		return (
			<Toolbar dir={this.props.intl.formatMessage({id: 'layout.direction'})}
			         className="navbar col-md-12 col-lg-12 col-xl-12 col-xs-12 col-sm-12">
				<ToolbarGroup className="col col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
					<div>
						<IndexLink to="/" activeClassName="active">
							<img className="navbar-logo" src={largeLogo}/>
						</IndexLink>
					</div>
				</ToolbarGroup>
				<ToolbarGroup className="col navbar-ver-center col-sm-3 col-md-3 col-lg-3 col-xl-3 hidden-xs">
					<div >
						<form onSubmit={this.search.bind(this)}>
							<TextField
								value={this.state.searchParam}
								onChange={this.paramChange}
								className="col-xs-12 navbar-search"
								hintText={this.props.intl.formatMessage({id: 'search'})}
								hintStyle={{textAlign: 'left'}}
								style={{WebkitTextFillColor: 'white!important'}}
							/>
						</form>
					</div>
				</ToolbarGroup>
				<ToolbarGroup
					className="row navbar-ver-center col-3 col-md-3 col-lg-3 col-xl-3 col-xs-3 col-sm-3 visible-md visible-lg visible-xl hidden-xs hidden-sm hidden-md">
					<div
						style={{textAlign: 'center', display: 'flex', marginTop: '50px'}}>
						<div className="col col-3">
							<FlatButton
								style={{color: '#ffffff'}}
								label="HOME"
								containerElement={<Link style={{fontWeight:'bold!important'}} to='/' />}
							/>
						</div>
						<div className="col col-3">
							<FlatButton
								style={{color: '#ffffff'}}
								label="FACTS"
								containerElement={<Link style={{fontWeight:'bold!important'}} to='/facts' />}
							/>
						</div>
						<div className="col col-6">
							{authBtn}
						</div>
					</div>
				</ToolbarGroup>
				<ToolbarGroup style={{padding: 0}}
				              className="col col-3 col-md-3 col-lg-3 col-xl-3 col-xs-3 col-sm-3 visible-xs visible-extra-small hidden-sm hidden-md hidden-lg hidden-lg-up">
					<div>
						<SideDrawer onRef={ref => (this.child = ref)}/>
					</div>
				</ToolbarGroup>
				<Snackbar
					open={this.state.snackOpen}
					message={this.props.intl.formatMessage({id: 'snack.search_not_found'})}
					autoHideDuration={4000}
				/>
			</Toolbar>

		);
	}

	static propTypes = {
		locale: PropTypes.string.isRequired,
		localeChange: PropTypes.func.isRequired,
		intl: intlShape.isRequired,
	}

	static contextTypes = {
		router: PropTypes.object,
		store: PropTypes.any
	};

}
/*
 Navbar.contextTypes = {
 router: PropTypes.object.isRequired
 }
 */

export default connect(mapStateToProps, Object.assign({}, localeActions))(injectIntl(withRouter(Navbar)))