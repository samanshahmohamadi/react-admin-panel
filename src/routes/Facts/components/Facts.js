import React from 'react'
import './Facts.scss'
import {FlatButton} from 'material-ui'
import MomentJal from 'moment-jalaali'
import Utils from '../../../utils/Utils'
import {injectIntl} from 'react-intl';
import {browserHistory} from 'react-router'
import MyLoader from '../../../components/MyLoader'

import {store} from '../../../main';

let Loader = require('react-loaders').Loader;
const utils = new Utils()

class FactsView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		}
	}

	componentDidMount() {
		this.getData()
	}

	getData() {
		this.setState({loading: true})
		this.props.getFacts()
			.then(() => {
				this.setState({loading: false})
			})
	}

	componentWillReceiveProps () {
		//console.log(this.props)
	}

	render() {
		let isLogin
		if (this.props.isAuth) {
			isLogin = <div>I am logged in!</div>
		} else {
			isLogin = <div>Not logged in yet :|</div>
		}
		if (!this.state.loading && this.props.facts) {
			return (
				<div className={''} style={{height: '100%', overflowY: 'hidden', overflowX: 'auto'}}>
					<div style={{fontSize:'30px', textAlign:'justify'}}>
						{this.props.facts.quote}
					</div>
					<div style={{marginTop:'20px', fontWeight:'bold', fontSize:'25px', color:'#d6d6d6', float:'right'}}>
						{this.props.facts.author}
					</div>
					{isLogin}
				</div>
			)
		} else {
			return <MyLoader/>
		}
	}
}

export default injectIntl(FactsView)

