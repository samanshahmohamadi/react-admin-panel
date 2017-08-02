import React from 'react'
import './SignUp.scss'
import {RaisedButton, TextField} from 'material-ui'
import {Field, reduxForm} from 'redux-form'
import MomentJal from 'moment-jalaali'
import * as sha256 from "fast-sha256";
import Utils from '../../../utils/Utils'
import {injectIntl} from 'react-intl';
import {browserHistory, Link} from 'react-router'
import MyLoader from '../../../components/MyLoader'
import HttpRequest from '../../../utils/HttpRequest'
import {asyncValidate, validate} from '../validators/validator'
import cover from '../assets/signup-cover.png'
const Config = require('Config')
import {store} from '../../../main'
const CryptoJS = require("crypto-js");

let Loader = require('react-loaders').Loader;
const utils = new Utils()

const renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (
	<TextField hintText={label}
		// floatingLabelText={label}
		       errorText={touched && error}
		       {...input}
		       {...custom}
	/>
)

class SignUpView extends React.Component {
	constructor(props) {
		super(props);
		const {pristine, submitting} = props
		this.state = {
			loading: false,
			pristine: props.pristine,
			submitting: props.submitting
		}
	}

	dispatchAlert(payload) {
		return dispatch => {
			dispatch({
				type: 'NEW_ALERT',
				payload: {
					type: payload.type,
					text: payload.text,
					time: payload.time
				}
			})
		}
	}

	handleSignUp = () => {
		let formData = store.getState().form.SignUpForm.values
		formData.passwordHash = CryptoJS.SHA256(formData.password).toString()
		formData.confirmPasswordHash = CryptoJS.SHA256(formData.repassword).toString()
		delete formData.password
		delete formData.repassword
		new HttpRequest().post(Config.apiUrl + "/signup", formData)
			.then(payload => {
				store.dispatch(this.dispatchAlert({
					type: 'success',
					text: this.props.intl.formatMessage({id: 'signup.alert.success'}),
					time: 4000
				}))
				browserHistory.push('/')
			})
			.catch(err => {

			})
	};

	/*	handleChange = (e) => {
	 this.setState({[e.target.name]: e.target.value});
	 }*/

	render() {
		if (!this.state.loading) {
			return (
				<div className={''} style={{height: '100%', overflowY: 'hidden', overflowX: 'auto'}}>
					<section style={{
						height: '25vh',
						backgroundImage: `url(${cover})`,
						backgroundSize: 'cover',
						backgroundPosition: '0'
					}}>
					</section>
					<section className="login-form-container" style={{height: '75vh', backgroundColor: '#f8f9f9'}}>
						<div className="row col-12">
							<h2 className="login-color-secondary">{utils.write({id: 'signup'})}</h2>
						</div>
						<form onSubmit={this.props.handleSubmit(this.handleSignUp.bind(this))} className="row col-12">
							<div className="col col-4" style={{margin: 'auto'}}>
								<div className="row col-12">
									<Field name="email" component={renderTextField}
									       label={this.props.intl.formatMessage({id: 'email'})}
									       style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}/>
									{/*<TextField
									 type="email"
									 name="email"
									 onChange={this.handleChange}
									 className="col-xs-12"
									 hintText={this.props.intl.formatMessage({id: 'email'})}
									 style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}
									 />*/}
								</div>
								<div className="row col-12">
									<Field name="username" component={renderTextField}
									       label={this.props.intl.formatMessage({id: 'username'})}
									       style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}/>
									{/*<TextField
									 name="username"
									 onChange={this.handleChange}
									 className="col-xs-12"
									 hintText={this.props.intl.formatMessage({id: 'username'})}
									 style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}
									 />*/}
								</div>
								<div className="row col-12">
									<Field type="password" name="password" component={renderTextField}
									       label={this.props.intl.formatMessage({id: 'password'})}
									       style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}/>
									{/*<TextField
									 name="password"
									 type="password"
									 onChange={this.handleChange}
									 className="col-xs-12"
									 hintText={this.props.intl.formatMessage({id: 'password'})}
									 />*/}
								</div>
								<div className="row col-12">
									<Field type="password" name="repassword" component={renderTextField}
									       label={this.props.intl.formatMessage({id: 'confirm_password'})}
									       style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}/>
									{/*<TextField
									 name="repassword"
									 type="password"
									 onChange={this.handleChange}
									 className="col-xs-12"
									 hintText={this.props.intl.formatMessage({id: 'confirm_password'})}
									 style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}
									 />*/}
								</div>
								<div className="row col-12">
									<Field name="name" component={renderTextField}
									       label={this.props.intl.formatMessage({id: 'first_name'})}
									       style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}/>
									{/*<TextField
									 name="name"
									 type="text"
									 onChange={this.handleChange}
									 className="col-xs-12"
									 hintText={this.props.intl.formatMessage({id: 'first_name'})}
									 style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}
									 />*/}
								</div>
								<div className="row col-12">
									<Field name="lastname" component={renderTextField}
									       label={this.props.intl.formatMessage({id: 'last_name'})}
									       style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}/>
									{/*<TextField
									 name="lastname"
									 type="text"
									 onChange={this.handleChange}
									 className="col-xs-12"
									 hintText={this.props.intl.formatMessage({id: 'last_name'})}
									 style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}
									 />*/}
								</div>
								{/*<div className="row col-12" style={{marginTop: '40px'}}>
								 <div className="col col-6" style={{padding: 0}}>
								 <Toggle
								 label="Remember Me"
								 labelPosition="right"
								 style={{marginBottom: 16}}
								 />
								 </div>
								 <div className="col-6">
								 <RaisedButton onTouchTap={this.handleSignUp} style={{width: '10%'}}
								 label="SignUp"
								 primary={true}/>
								 </div>
								 </div>*/}
							</div>
							<div className="col col-4" style={{margin: 'auto'}}>
								<div className="row col-12">
									<Field name="phoneNo" component={renderTextField}
									       label={this.props.intl.formatMessage({id: 'phoneNo'})}
									       style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}/>
									{/*<TextField
									 name="phoneNo"
									 type="phoneNo"
									 onChange={this.handleChange}
									 className="col-xs-12"
									 hintText={this.props.intl.formatMessage({id: 'phoneNo'})}
									 style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}
									 />*/}
								</div>
								<div className="row col-12">
									<Field name="storeName" component={renderTextField}
									       label={this.props.intl.formatMessage({id: 'signup.store_name'})}
									       style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}/>
									{/*<TextField
									 name="storeName"
									 type="text"
									 onChange={this.handleChange}
									 className="col-xs-12"
									 hintText={this.props.intl.formatMessage({id: 'signup.store_name'})}
									 style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}
									 />*/}
								</div>
								<div className="row col-12">
									<Field name="siteAddress" component={renderTextField}
									       label={this.props.intl.formatMessage({id: 'signup.site_addr'})}
									       style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}/>
									{/*<TextField
									 name="siteAddress"
									 type="text"
									 onChange={this.handleChange}
									 className="col-xs-12"
									 hintText={this.props.intl.formatMessage({id: 'signup.site_addr'})}
									 style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}
									 />*/}
								</div>
								<div className="row col-12">
									<Field name="callbackURL" component={renderTextField}
									       label={this.props.intl.formatMessage({id: 'signup.callback_url'})}
									       style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}/>
									{/*<TextField
									 name="callbackURL"
									 type="text"
									 onChange={this.handleChange}
									 className="col-xs-12"
									 hintText={this.props.intl.formatMessage({id: 'signup.callback_url'})}
									 style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}
									 />*/}
								</div>
								<div className="row col-12">
									<Field name="address" multiLine={true}
									       rows={2}
									       rowsMax={4}
									       component={renderTextField}
									       label={this.props.intl.formatMessage({id: 'address'})}
									       style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}/>
									{/*<TextField
									 name="address"
									 hintText={this.props.intl.formatMessage({id: 'address'})}
									 multiLine={true}
									 rows={2}
									 rowsMax={4}
									 onChange={this.handleChange}
									 style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}
									 />*/}
								</div>
								<div className="row col-12">
									<Field name="siteDesc" multiLine={true}
									       rows={2}
									       rowsMax={4}
									       component={renderTextField}
									       label={this.props.intl.formatMessage({id: 'signup.site_desc'})}
									       style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}/>
									{/*<TextField
									 name="siteDesc"
									 hintText={this.props.intl.formatMessage({id: 'signup.site_desc'})}
									 multiLine={true}
									 rows={2}
									 rowsMax={4}
									 onChange={this.handleChange}
									 style={{direction: this.props.intl.formatMessage({id: 'layout.direction'})}}
									 />*/}
								</div>
							</div>
							<div className="col col-4" style={{margin: 'auto'}}>
								<div className="row col-12">
									<div style={{padding:0}} className="col-12">
										<RaisedButton type='submit'
										              fullWidth={true}
										              disabled={this.props.pristine || this.props.pristine.submitting}
										              style={{width: '10%'}}
										              label={this.props.intl.formatMessage({id: 'signup'})}
										              labelStyle={{fontWeight:'bold'}}
										              primary={true}/>
									</div>
								</div>
								<div className="row col-12">
									<Link to={'/'}><h2 className="color-accent">Already have account?</h2></Link>
								</div>
							</div>
							<div className="row col-4">
							</div>
							<div className="row col-4">

							</div>
						</form>
					</section>
				</div>
			)
		} else {
			return <MyLoader/>
		}
	}
}

export default reduxForm({
	form: 'SignUpForm',  // a unique identifier for this form
	validate,
	asyncValidate
})(injectIntl(SignUpView))

// export default injectIntl(SignUpView)

