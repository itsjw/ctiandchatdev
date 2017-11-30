module.exports = function ( sock , ipaddress ) {

	
	// agi
	global.agicore 	     = require( socket + "agi/agicore" )
	global.agibuildivr   = require( socket + "agi/buildivr" )
	global.agisettingivr = require( socket + "agi/settingivr" )
	// ami
	global.amicore 	     = require( socket + "ami/amicore" )
	global.evtcall       = require( socket + "ami/call" )
	global.evthangup 	 = require( socket + "ami/hangup" )
	global.evtmonitor    = require( socket + "ami/monitor" )
	global.evtspying     = require( socket + "ami/spying" )
	// chat
	global.receivechat   = require( socket + "chat/receive" )
	global.roomchat      = require( socket + "chat/room" )
	global.sendchat      = require( socket + "chat/send" )

	if ( sock.hasOwnProperty(ipaddress) ) {
		var usock = sock[ipaddress]
	} else {
		var usock = sock
	}

	

}