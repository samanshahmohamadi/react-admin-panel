/**
 * Module dependencies.
 */

const express = require('express')
const bodyParser = require('body-parser')
const hash = require('pbkdf2-password')()
const path = require('path')
const session = require('express-session')

const app = module.exports = express()

// middleware
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
	resave: false, // don't save session if unmodified
	saveUninitialized: false, // don't create session until something stored
	secret: 'shhhh, very secret'
}))

// Session-persisted message middleware

app.use(function (req, res, next) {
	const err = req.session.error
	const msg = req.session.success
	delete req.session.error
	delete req.session.success
	res.locals.message = ''
	if (err) res.locals.message = '<p class="msg error">' + err + '</p>'
	if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>'
	next()
})

// dummy database

const users = {
	tj: {name: 'tj'}
}

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)

hash({password: 'foobar'}, function (err, pass, salt, hash) {
	if (err) throw err
	// store the salt & hash in the "db"
	users.tj.salt = salt
	users.tj.hash = hash
})

// Authenticate using our plain-object database of doom!

function authenticate (name, pass, fn) {
	if (!module.parent) console.log('authenticating %s:%s', name, pass)
	const user = users[name]
	// query the db for the given username
	if (!user) return fn(new Error('cannot find user'))
	// apply the same algorithm to the POSTed password, applying
	// the hash against the pass / salt, if there is a match we
	// found the user
	hash({password: pass, salt: user.salt}, function (err, pass, salt, hash) {
		if (err) return fn(err)
		if (hash == user.hash) return fn(null, user)
		fn(new Error('invalid password'))
	})
}

function restrict (req, res, next) {
	if (req.session.user) {
		next()
	} else {
		req.session.error = 'Access denied!'
		res.redirect('http://localhost:3000')
	}
}

app.get('/', function (req, res) {
	res.redirect('http://localhost:3000')
})

app.get('/restricted', restrict, function (req, res) {
	res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>')
})

app.get('/logout', function (req, res) {
	// destroy the user's session to log them out
	// will be re-created next request
	req.session.destroy(function () {
		res.redirect('http://localhost:3000')
	})
})

app.post('/login', function (req, res) {
	authenticate(req.body.username, req.body.password, function (err, user) {
		if (user) {
			// Regenerate session when signing in
			// to prevent fixation
			req.session.regenerate(function () {
				// Store the user's primary key
				// in the session store to be retrieved,
				// or in this case the entire user object
				req.session.user = user
				req.session.success = 'Authenticated as ' + user.name +
					' click to <a href="/logout">logout</a>. ' +
					' You may now access <a href="/restricted">/restricted</a>.'
				res.json({'fname': 'Saman', 'lname': 'Shahmohamadi', 'age': 28, 'username': user.name})
				//res.redirect('back');
			})
		} else {
			req.session.error = 'Authentication failed, please check your ' +
				' username and password.' +
				' (use "tj" and "foobar")'
			res.redirect('http://localhost:3000')
		}
	})
})

app.post('/dashboardData', function (req, res) {
	let data = {
		topBoxes: [
			{value: '$ 32,312', text: 'Revenue'},
			{value: '321,211', text: 'Visits'},
			{value: '43.2 %', text: 'Bounce rate'},
			{value: '82 s', text: 'Avg time'}
		]
	}
	res.json(data)
})

/* istanbul ignore next */
if (!module.parent) {
	app.listen(3001)
	console.log('Express started on port 3001')
}
