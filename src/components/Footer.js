/**
 * Created by saman on 6/10/17.
 */
import React from 'react';
import {connect} from 'react-redux'
import FontAwesome from 'react-fontawesome';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {injectIntl, intlShape} from 'react-intl';
import PropTypes from 'prop-types'
import FontIcon from 'material-ui/FontIcon';

import Utils from '../utils/Utils'
const utils = new Utils()
import {actions as localeActions} from '../store/locale'

import logo from '../../public/logo-small.png'

const mapStateToProps = (state) => ({
	locale: state.locale
})

class Footer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	handleLangChange = (e, index, value) => {
		this.props.localeChange(value)
	}

	render() {
		// const toolbarStyle = {background: '#2abc73', color: '#ffffff'}
		return (
			<div className="footer">
				<div dir={this.props.intl.formatMessage({id: 'layout.direction'})} className="row center col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
				     style={{alignItems: 'flex-start'}}>
					<div className="col col-3">
						<div className="col col-12"
						     style={{float: 'left', display: 'inline-block', textAlign: 'left', marginTop: '5%'}}>
							<FontAwesome className='row col-lg-3 col-md-3 col-sm-12 col-xl-3 color-green footer-social'
							             name='twitter' size='lg'
							             style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}/>
							<FontAwesome className='row col-lg-3 col-md-3 col-sm-12 col-xl-3 color-green footer-social'
							             name='instagram' size='lg'
							             style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}/>
							<FontAwesome className='row col-lg-3 col-md-3 col-sm-12 col-xl-3 color-green footer-social'
							             name='facebook' size='lg'
							             style={{textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}/>
						</div>

					</div>
					<div className="col col-3 footer-link-col"
					     style={{marginTop:'12px', textAlign: this.props.intl.formatMessage({id: 'layout.textAlign'})}}>
						<div className="col col-12">
							<div className="color-green">PRODUCTS</div>
							<div>WALLET</div>
							<div>BUSINESS</div>
							<div>RESEARCH</div>
						</div>
					</div>
					<div className="col col-6" style={{padding: 0}}>
						{/*<div className="row" style={{textAlign: 'center', float: 'center'}}>
						 <SelectField
						 className="lang-selector"
						 selectedMenuItemStyle={{WebkitTextFillColor: 'white'}}
						 value={this.props.locale}
						 onChange={this.handleLangChange}
						 style={{width: '35%', WebkitTextFillColor: 'white', margin: 'auto'}}
						 >
						 {this.props.locale === 'fa' ? (
						 <MenuItem className={'current-lang'} value={'fa'} primaryText="فارسی"/>
						 ) : (
						 <MenuItem className={'lang-item'} value={'fa'} primaryText="فارسی"/>
						 )}
						 {this.props.locale === 'en' ? (
						 <MenuItem className={'current-lang'} value={'en'} primaryText="English"/>
						 ) : (
						 <MenuItem className={'lang-item'} value={'en'} primaryText="English"/>
						 )}
						 {this.props.locale === 'ru' ? (
						 <MenuItem className={'current-lang'} value={'ru'} primaryText="русский"/>
						 ) : (
						 <MenuItem className={'lang-item'} value={'ru'} primaryText="русский"/>
						 )}
						 </SelectField>
						 </div>*/}
						<div className="row" style={{float: 'right'}}>
							<img className="footer-logo" src={logo}/>
						</div>
					</div>
				</div>
			</div>
		)
			;
	}

	static propTypes = {
		locale: PropTypes.string.isRequired,
		localeChange: PropTypes.func.isRequired
	}
}

export default connect(mapStateToProps, Object.assign({}, localeActions))(injectIntl(Footer))


// export default injectIntl(Footer)
