/**
 * Created by saman on 6/10/17.
 */
import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {IndexLink} from 'react-router'
import logo from '../../public/logo.png'
import TextField from 'material-ui/TextField';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import HttpRequest from '../utils/HttpRequest'
import {browserHistory} from 'react-router'
import {injectIntl} from 'react-intl';
import Snackbar from 'material-ui/Snackbar';

const Config = require('Config')

class SideDrawer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {open: false, searchParam: '', snackOpen: false,};
	}

	componentDidMount() {
		this.props.onRef(this)
	}

	componentWillUnmount() {
		this.props.onRef(undefined)
	}

	handleToggle = () => this.setState({open: !this.state.open});

	paramChange = (e) => {
		this.setState({searchParam: e.target.value})
	}

	search = (e) => {
		e.preventDefault();
		new HttpRequest().get(Config.apiUrl + "/search", {param: this.state.searchParam.toString()})
			.then(payload => {
				const type = payload.data.type
				switch (type) {
					case 'transaction':
						browserHistory.push('/tx/' + payload.data.data.txId)
						this.setState({open: false})
						break
					case 'block':
						browserHistory.push('/block/' + payload.data.data.blockHash)
						this.setState({open: false})
						break
					case 'address':
						browserHistory.push('/address/' + payload.data.data.blockHash)
						this.setState({open: false})
						break
				}
			})
			.catch(err => {
				console.error(err)
				this.setState({snackOpen: true, searchParam: ''})
				setTimeout(() => {
					this.setState({snackOpen: false})
				}, 4000)
			})
	}


	render() {
		return (
			<div>
				<IconButton
					onTouchTap={this.handleToggle}
					style={{
						float: 'left',
						width: 96,
						height: 96,
						padding: 24
					}}>
					<FontIcon className="material-icons drawer-btn"
					          style={{marginRight: 0, fontSize: '36', position: 'absolute'}}>menu</FontIcon>
					{/*<MenuIcon/>*/}
				</IconButton>
				<Drawer
					containerStyle={{overflow: 'hidden!important'}}
					width={288}
					docked={false}
					openSecondary={false}
					open={this.state.open}
					onRequestChange={(open) => this.setState({open})}>
					<AppBar
						dir="rtl"
						showMenuIconButton={false}>
						<div className="col-12" style={{margin: 'auto'}}>
							<IndexLink to="/" activeClassName="active">
								<img className="navbar-logo" src={logo}/>
							</IndexLink>
						</div>
					</AppBar>
					<div>
						<MenuItem className="drawer-item"> <FlatButton fullWidth={true} label="CHARTS" primary={true}/>
						</MenuItem>
						<MenuItem className="drawer-item"> <FlatButton fullWidth={true} label="API" primary={true}/>
						</MenuItem>
					</div>
					<Toolbar className="drawer-footer">
						<ToolbarGroup className="row col-12 col-md-12 col-lg-12 col-xl-12 col-xs-12 col-sm-12">
							<form id={'searchForm'} onSubmit={this.search.bind(this)}>
								<TextField
									id={'searchParam'}
									value={this.state.searchParam}
									onChange={this.paramChange}
									className="col-xs-12"
									hintText={this.props.intl.formatMessage({id: 'search'})}
									hintStyle={{textAlign: 'left'}}
									style={{
										WebkitTextFillColor: 'white!important', wordWrap: 'break-word',
										whiteSpace: 'normal',
									}}
								/>
							</form>
						</ToolbarGroup>
					</Toolbar>
					<Snackbar
						style={{width:'100%'}}
						open={this.state.snackOpen}
						message={this.props.intl.formatMessage({id: 'snack.search_not_found'})}
						autoHideDuration={4000}
					/>
				</Drawer>
			</div>
		);
	}
}

export default injectIntl(SideDrawer)
