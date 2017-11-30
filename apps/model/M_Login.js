module.exports = {

	/**
	 * [ActionLogin description]
	 */
	ActionLogin : function () {
		var username = req.body.username
		var password = req.body.password
		var ipuser	 = app.locals.clientip


		// check user
		app.locals.registered = 0
		var queryCheckIp = "SELECT * FROM vac_ipregistered a WHERE a.IP='"+ipuser+"' AND a.Flag=1" 
		conn.query( queryCheckIp , function ( err , row , fields ) {
			if ( err ) {

			} else {
				if ( row.length > 0 ) {
					var sock = Routes.Sock(ipuser)
					if ( sock != false ) {
						evtsock.s('noticeip' , {
							message : notice.ipnotregistered
						})
						
						req.session.userid = 1
						req.session.save()
						res.redirect('/')
					} 
				} 
			}
		})
	}


}
