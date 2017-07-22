/**
 * Created by saman on 6/18/17.
 */
import React from 'react'
import MomentJal from 'moment-jalaali'
import {defineMessages, FormattedMessage} from 'react-intl'

export default class Utils {

	timestampToJalali(t) {
		if (t) return MomentJal.unix(t).format('HH:MM:SS - jYYYY/jM/jD')
		else return ''
	}

	write(options = {}) {
		if (options.id) return <FormattedMessage {...options} />
		else if (options.text) return options.text
		else return ''
	}

	satoshiToBTC(s) {
		return s / 100000000;
	}

	bitToKB(s) {
		return (s / (1024 * 8)).toFixed(3)
	}
}