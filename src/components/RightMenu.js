/**
 * Created by saman on 7/22/17.
 */
import React from 'react'
import {browserHistory} from 'react-router'
import HttpRequest from '../utils/HttpRequest'

import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import {store} from '../main'
const Config = require('Config')
const RightMenu = (props) => (
	<IconMenu
		{...props}
		iconButtonElement={
			<IconButton><MoreVertIcon /></IconButton>
		}
		targetOrigin={{horizontal: 'right', vertical: 'top'}}
		anchorOrigin={{horizontal: 'right', vertical: 'top'}}
	>
		<MenuItem primaryText="Help"/>
		<MenuItem onTouchTap={handleLogout} primaryText="Logout"/>
	</IconMenu>
)

const handleLogout = () => {
	localStorage.clear()
	store.dispatch({
		type: 'LOGGED_OUT',
		payload: {}
	})
	browserHistory.push('/')
	/*new HttpRequest().get(Config.apiUrl + '/logout', {})
		.then(() => {
			localStorage.clear()
			store.dispatch({
				type: 'LOGGED_OUT',
				payload: {}
			})
			// browserHistory.push('/')
		})
		.catch(err => {
			return new Error(err)
		})*/
}

RightMenu.muiName = 'IconMenu'

export default RightMenu
