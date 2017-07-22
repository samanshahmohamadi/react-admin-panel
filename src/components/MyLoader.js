/**
 * Created by saman on 6/10/17.
 */
import React from 'react'
let Loader = require('react-loaders').Loader

export default class MyLoader extends React.Component {

	constructor (props) {
		super(props)
		this.state = {}
	}

	render () {
		return (<div style={{height: '700px', width: '100%', textAlign: 'center', position: 'relative'}}>
			<div style={{
				position: 'absolute',
				top: '40%',
				left: '50%'
			}}><Loader type="ball-scale-multiple" active/></div>
		</div>)
	}
}
