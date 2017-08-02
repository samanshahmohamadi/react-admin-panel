import React from 'react'
import {connect} from 'react-redux'
import './Dashboard.scss'
import {FlatButton, RaisedButton, TextField, Toggle, Paper, LinearProgress} from 'material-ui'
import MomentJal from 'moment-jalaali'
import Utils from '../../../utils/Utils'
import {browserHistory} from 'react-router'
import MyLoader from '../../../components/MyLoader'
import HttpRequest from '../../../utils/HttpRequest'
import {store} from '../../../main'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl';
import {redA400, deepPurple300} from 'material-ui/styles/colors'
import TrendUpSVG from 'material-ui/svg-icons/action/trending-up'
import TrendDownSVG from 'material-ui/svg-icons/action/trending-down'
import UserPending from './UserPending'
import UserChecking from './UserChecking'

import {LineChart, Line, CartesianGrid, Tooltip, XAxis, YAxis, Legend, ResponsiveContainer} from 'recharts'
// import {recharts} from 'recharts'
// const {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} = recharts
let Loader = require('react-loaders').Loader
const utils = new Utils()

const paperStyle = {
	height: '15vh',
	margin: 10,
	padding: 20,
	textAlign: 'center',
	display: 'inline-block',
	borderLeftColor: '#dad134',
	borderLeftWidth: '2px'
}

const paperTypes = ['info', 'info', 'info', 'info']

const mapStateToProps = (state) => ({
	locale: state.locale,
	auth: state.auth
})

class DashboardView extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			loading: false
		}
	}

	componentDidMount () {
		this.getData()
	}

	getData () {
		this.setState({loading: true})
		this.props.getData()
			.then(() => {
				this.setState({loading: false})
			})
	}

	chart () {
	}

	render () {
		let chartData
		if (this.props.data) {
			chartData = Object.keys(this.props.data.btcPrice).map(function (index) {
				return {date: MomentJal(index, 'YYYY-M-D').valueOf(), Price: this.props.data.btcPrice[index]}
			}, this)
		}
		const width = 700
		const height = 300
		const margins = {left: 100, right: 100, top: 50, bottom: 50}
		const title = 'Bitcoin Price'
		let chartSeries = [
			{
				field: 'Price',
				name: 'BTC/USD',
				color: '#4ab481',
				style: {
					'strokeWidth': 4,
					'strokeOpacity': 1,
					'fillOpacity': 0.4
				}
			}
		]
		const tickFormatDate = function (ts) {
			return MomentJal.unix(ts / 1000).format(this.props.intl.formatMessage({id: 'date.format.monthday'}))
		}
		const yFormatter = function (v) {
			return y
		}
		if (!this.state.loading && this.props.data) {
			return (
				<div>
					{/*<div className="row col-12" style={{marginBottom:'20px'}}>
						{this.props.data.topBoxes.map((row, index) => {
							return <Paper className={'paper col col-5 ' + paperTypes[index] } key={index}
							              style={paperStyle} zDepth={1}>
								<div className="row" style={{fontSize: '24px', fontWeight: 'bold'}}>
									{row.value}
								</div>
								<div className="row" style={{marginTop: '10px', fontSize: '18px'}}>
									{row.text}
								</div>
							</Paper>
						})}
					</div>
					<div style={{marginLeft: '20px'}}>
						<Paper style={{height: '70vh', padding: '30px'}} className={'row col-12 '} key={'line-chart'}
						       zDepth={1}>
							<div className="col col-9">
								<h2>BTC/USD</h2>
								<ResponsiveContainer width={'100%'} height={'80%'}>
									<LineChart width={700} height={300} data={chartData}
									           margin={{top: 5, right: 20, bottom: 5, left: 0}}>
										<XAxis label={'Date'} padding={{top: '20px'}} dataKey="date"
										       tickFormatter={tickFormatDate.bind(this)}/>
										<YAxis label={'BTC/USD'} unit={'USD'} padding={{right: '20px'}} type="number"
										       domain={['auto', 'auto']}/>
										<Line legendType="cross" type="monotone"
										      dot={{stroke: deepPurple300, strokeWidth: 2}} dataKey="Price"
										      stroke={deepPurple300} strokeWidth="2"/>
										<CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
										<Tooltip labelFormatter={tickFormatDate.bind(this)}
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
							<div className="col col-3">
								<h4>Today's stats</h4>
								<div className="row" style={{marginBottom: '20px'}}>
									<h6 style={{margin: 10}}>214 Payments</h6><span><TrendUpSVG style={{fill: '#2abc73', position: 'absolute', right:'20px'}}/></span>
									<LinearProgress color={deepPurple300} mode="determinate" value={40}/>
								</div>
								<div className="row" style={{marginBottom: '20px'}}>
									<h6 style={{margin: 10}}>32,123 $ Income</h6><span><TrendDownSVG style={{fill: redA400, position: 'absolute', right:'20px'}}/></span>
									<LinearProgress color={deepPurple300} mode="determinate" value={70}/>
								</div>
							</div>
						</Paper>
					</div>*/}
					<div className="row col-12" style={{marginBottom:'20px'}}>
						{this.props.auth.user.status === 'Pending' ? (
							<UserPending/>
						) : this.props.auth.user.status === 'Checking' ? (
							<UserChecking/>
						) : (
							null
						)}
					</div>
				</div>
			)
		} else {
			return <MyLoader/>
		}
	}

	static propTypes = {}

}
// export default injectIntl(DashboardView)
export default connect(mapStateToProps)(injectIntl(DashboardView))

