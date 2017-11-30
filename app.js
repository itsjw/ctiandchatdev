// require all important for server create
global.app  = require('express')()
global.http = require('http').Server(app)
global.io   = require('socket.io')(http)
global.fs   = require('fs')
global.ejs  = require('ejs')
global.engine  = require('ejs-locals')
global.dns     = require('dns')
global.os      = require('os')
global.url     = require('url')
global.session = require('express-session')
global.cookieParser = require('cookie-parser');
global.MemcachedStore = require('connect-memcached')(session);
global.bodyParser = require('body-parser')
global.mysql  	  = require('mysql')

//base folder
global.dirname = __dirname + "/"

// host url
global.openport = 8082
global.iphostname = "http://localhost" + "" + ":" + openport // not effect just testing

// set global define folder 
global.model 	  = dirname + "apps/model/"
global.view 	  = dirname + "apps/view/"
global.controller = dirname + "apps/controller/"
global.helper     = dirname + "apps/helper/"
global.socket     = dirname + "apps/sock/"
global.config     = dirname + "apps/config/"


// load notice warning
global.notice  	  = require( config + "noticewarning" )
app.locals.notice = notice


//socket users
// Socket Transaction traffic
global.Socket = require( dirname + "apps/SocketTransaction" )


// Routing Socket and register ip
var usersSocket = {}
var socketWindow = {}
var socketWindowCount = parseInt(0)
io.on("connection" , function (sock) {

	var address = controls.clientip(sock.handshake.address);
	if ( address.length > 0 ) {
		//var users = sockuser(address , sock)
		if ( typeof usersSocket == 'object' ) {
			// if ip was found in user socket
			if ( usersSocket.hasOwnProperty(address) ) {
				usersSocket[address] = sock
			} else {
				usersSocket[address] = sock
			}
		} 
	}

	// count window active
	var userSocket_keys = Object.keys(usersSocket)
	var ipAddressSockPosition = userSocket_keys.indexOf(address)
	if ( ipAddressSockPosition > -1 ) {
		if ( userSocket_keys[ipAddressSockPosition] ) {

			// check if socket window with ipaddress = address is exists
			if ( socketWindow.hasOwnProperty(address) ) {
				socketWindow[address] += 1
			} else {
				var socketWindowCounts = socketWindowCount + 1
				socketWindow[address] = socketWindowCounts
			}
		}
	}


	// define local sock users
	app.locals.sockusers = usersSocket
	app.locals.socketwindow = socketWindow

	console.log((app.locals.socketwindow))

	Socket(usersSocket , address )
	//console.log(Object.keys(usersSocket))
})



// load helper
global.controls = require( helper + "controller" ) // for controll route method
global.evtsock = require( helper + "evtsock" ) // for function general socket

// route url 
global.Routes = require( dirname + "apps/Routes" )

// config mysql 
global.serverphp  = require( dirname + 'serverphp')
global.mysql_config   = require( config + 'databases')



// set engine
app.engine('ejs' , engine)
app.set('views', __dirname + '/view');
app.set('view engine' , 'ejs')
 
// error handling 
app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})	



// session handle
app.use(cookieParser());
app.use(session({
  cookieName: 'session',
  secret: 'eg[isfd-8yF9-7w2315df{}+Ijsli;;to8',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  resave : true ,
  saveUninitialized : true , 
  secure: true,
  ephemeral: true 
}));




app.use(bodyParser.json()); // support json encoded bodies and get POST param Route
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


/**
 * end for session middleware
 */

/**
 * [mysql description]
 * @type {[type]}
 */
global.conn = mysql_config()


// routing generator file
Routes.Sock()
Routes.Home()
Routes.Library()
Routes.MenuBar()
Routes.Auth()





// host name resolver
Routes.hostname()


// listen server
http.listen( openport , function () {
	console.log('Listen as 8082')
})