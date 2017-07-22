import React from 'react'
import './Login.scss'
import {FlatButton, RaisedButton, TextField, Toggle} from 'material-ui'
import MomentJal from 'moment-jalaali'
import Utils from '../../../utils/Utils'
import {injectIntl} from 'react-intl';
import {browserHistory} from 'react-router'
import MyLoader from '../../../components/MyLoader'
import HttpRequest from '../../../utils/HttpRequest'
import cover from '../../../../public/cover.jpg'

import {store} from '../../../main';

let Loader = require('react-loaders').Loader;
const utils = new Utils()

class LoginView extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			loading: false,
			username: '',
			password: ''
		}
	}

	dispatchLogin = (user) => {
		return dispatch => {
			dispatch({
				type: 'LOGGED_IN',
				payload: user
			})
		}
	}

	handleLogin = () => {
		new HttpRequest().post("http://localhost:3001/login", {
			username: this.state.username,
			password: this.state.password
		})
			.then(payload => {
				localStorage.setItem('isAuth', true)
				localStorage.setItem('username', payload.data.username)
				store.dispatch(this.dispatchLogin(payload.data))
				browserHistory.push('/dashboard')
			})
			.catch(err => {
			})
		//this.props.loginStateChange(true);
	};

	usernameChange = (e) => {
		this.setState({username: e.target.value})
	}
	passwordChange = (e) => {
		this.setState({password: e.target.value})
	}

	componentDidMount () {
	}

	render () {
		if (!this.state.loading) {
			return (
				<div className={''} style={{height: '100%', overflowY: 'hidden', overflowX: 'auto'}}>
					<section style={{
						height: '35vh',
						backgroundImage: `url(${cover})`
					}}>
					</section>
					<section className="row login-form-container" style={{height: '65vh', backgroundColor: '#e5e6e6'}}>
						<div className="col col-6" style={{margin: 'auto'}}>
							<h2 className="login-color-secondary">Dashboard Login</h2>
							<form>
								<div className="row col-12">
									<TextField
										value={this.state.username}
										onChange={this.usernameChange}
										className="col-xs-12"
										hintText="Username"
									/>
								</div>
								<div className="row col-12">
									<TextField
										type="password"
										value={this.state.password}
										onChange={this.passwordChange}
										className="col-xs-12"
										hintText="Password"
									/>
								</div>
								<div className="row col-12" style={{marginTop: '40px'}}>
									<div className="col col-6" style={{padding: 0}}>
										<Toggle
											label="Remember Me"
											labelPosition="right"
											style={{marginBottom: 16}}
										/>
									</div>
									<div className="col-6">
										<RaisedButton onTouchTap={this.handleLogin} style={{width: '10%'}} label="Login"
										              primary={true}/>
									</div>
								</div>
							</form>
						</div>
						<div className="col col-6" style={{margin: 'auto'}}>
							<h2 className="color-accent">Not Registered Yet?</h2>
							<RaisedButton style={{width: '50%'}} label="Register" secondary={true}/>
						</div>
					</section>
				</div>
			)
		} else {
			return <MyLoader/>
		}
	}
}

export default injectIntl(LoginView)

