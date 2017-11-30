module.exports = {

	spec : function () {
		var users_socket = app.locals.sockusers
		var ipaddress    = app.locals.clientip
		if ( typeof(users_socket) == 'object' && users_socket.hasOwnProperty(ipaddress) ) {
			return users_socket[ipaddress]
		} else {
			return false
		}
	} , 

	b : function ( for_param , message ) {
		io.emit( for_param , message )
	} , 

	s : function ( for_param , message ) {
		var spec = this.spec()
		if ( spec != false ) {
			spec.emit( for_param , message )
		}
	}

}