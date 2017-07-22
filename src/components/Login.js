/**
 * Created by saman on 7/15/17.
 */
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import HttpRequest from '../utils/HttpRequest'
import PropTypes from 'prop-types'
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class Login extends React.Component {
	state = {
		open: false,
		username: '',
		password: '',
		isLogin: false
	};

	static propTypes = {
		location: PropTypes.object
	};

	static contextTypes = {
		store: PropTypes.any
	};

	handleOpen = () => {
		this.setState({open: true});
	};

	handleClose = () => {
		this.setState({open: false});
	};

	dispatchLogin = (user) => {
		return dispatch => {
			dispatch({
				type: 'LOGGED_IN',
				payload: user
			})
		}
	}

	handleLogin = () => {
		const { store } = this.context
		new HttpRequest().post("http://localhost:3001/login", {
			username: this.state.username,
			password: this.state.password
		})
			.then(payload => {
				localStorage.setItem('isAuth', true)
				localStorage.setItem('username', payload.data.username)
				localStorage.setItem('fname', payload.data.fname)
				localStorage.setItem('lname', payload.data.lname)
				localStorage.setItem('age', payload.data.age)
				this.handleClose()
				store.dispatch(this.dispatchLogin(payload.data))
			})
			.catch(err => {
				alert('Login failed!')
			})
		//this.props.loginStateChange(true);
	};

	usernameChange = (e) => {
		this.setState({username: e.target.value})
	}
	passwordChange = (e) => {
		this.setState({password: e.target.value})
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this.handleClose}
			/>,
			<FlatButton
				label="Login"
				primary={true}
				keyboardFocused={false}
				onTouchTap={this.handleLogin}
			/>,
		];

		return (
			<div>
				<FlatButton labelStyle={{fontWeight: 'bold', color: '#ffffff'}} label="Login"
				            onTouchTap={this.handleOpen}/>
				<Dialog
					title="Login"
					actions={actions}
					modal={true}
					open={this.state.open}
					onRequestClose={this.handleClose}
					contentStyle={{width: '40%', maxWidth: 'none'}}
				>
					<form onSubmit={this.handleLogin}>
						<div>
							<TextField
								value={this.state.username}
								onChange={this.usernameChange}
								className="col-xs-12 navbar-search"
								hintText="Username"
							/>
						</div>
						<div>
							<TextField
								value={this.state.password}
								onChange={this.passwordChange}
								className="col-xs-12 navbar-search"
								hintText="Password"
							/>
						</div>
					</form>
				</Dialog>
			</div>
		);
	}
}