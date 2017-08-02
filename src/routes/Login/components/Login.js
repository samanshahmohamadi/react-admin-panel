import React from 'react'
import './Login.scss'
import {FlatButton, RaisedButton, TextField, Toggle} from 'material-ui'
import MomentJal from 'moment-jalaali'
import Utils from '../../../utils/Utils'
import {injectIntl} from 'react-intl';
import {browserHistory, Link} from 'react-router'
import MyLoader from '../../../components/MyLoader'
import HttpRequest from '../../../utils/HttpRequest'
import cover from '../assets/login-cover.jpg'
const Config = require('Config')
import {store} from '../../../main';
const CryptoJS = require("crypto-js");

let Loader = require('react-loaders').Loader;
const utils = new Utils()

class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			username: '',
			password: ''
		}
	}

	dispatchLogin = (auth) => {
		return dispatch => {
			dispatch({
				type: 'LOGGED_IN',
				payload: auth
			})
		}
	}

	handleLogin = () => {
		new HttpRequest().post(Config.apiUrl + "/login", {
			username: this.state.username,
			passwordHash: CryptoJS.SHA256(this.state.password).toString()
		})
			.then(payload => {
				console.log(payload)
				localStorage.setItem('isAuth', true)
				localStorage.setItem('auth', payload.data.auth)
				localStorage.setItem('address', payload.data.address)
				localStorage.setItem('email', payload.data.email)
				localStorage.setItem('emailValidated', payload.data.emailValidated)
				localStorage.setItem('phoneNo', payload.data.phoneNo)
				localStorage.setItem('phoneNoValidated', payload.data.phoneValidated)
				localStorage.setItem('stores', JSON.stringify(payload.data.stores))
				localStorage.setItem('username', payload.data.username)
				localStorage.setItem('status', payload.data.status)
				localStorage.setItem('id', payload.data.id)
				localStorage.setItem('isAdmin', payload.data.isAdmin)
				store.dispatch(this.dispatchLogin(payload.data))
				browserHistory.push('/dashboard')
			})
			.catch(err => {
				console.log(err)
			})
		//this.props.loginStateChange(true);
	};

	usernameChange = (e) => {
		this.setState({username: e.target.value})
	}
	passwordChange = (e) => {
		this.setState({password: e.target.value})
	}

	componentDidMount() {
	}

	render() {
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
									<div style={{padding: 0}} className="col col-12">
										<Link to={'/forgetpassword'}><h4 style={{fontWeight:'normal'}} className="color-accent">Forgot Your
											Password?</h4></Link>
									</div>
								</div>
							</form>
						</div>
						<div className="col col-6" style={{margin: 'auto'}}>
							<div className="col col-12">
								<h2 className="color-accent">Not Registered Yet?</h2>
								<Link to={'/signup'}><RaisedButton style={{width: '50%'}}
								                                   label={this.props.intl.formatMessage({id: 'signup_now'})}
								                                   secondary={true}/></Link>
							</div>
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

