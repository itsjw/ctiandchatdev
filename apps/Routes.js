module.exports = {

	Sock : function ( address ) {
		var users_socket = app.locals.sockusers
		if ( typeof(users_socket) == 'object' && users_socket.hasOwnProperty(address) ) {
			return users_socket[address]
		} else {
			return false
		}
	} , 

	Home : function () {
		var these = this
		app.get( "/" , function (req  , res) {



			// collect url
			app.locals.fullurl  = req.protocol + '://' + req.get('host')
			app.locals.clientip = controls.clientip(req.connection.remoteAddress)

			var objRender = {
				req     : req , 
				res     : res , 
				title   : "CTI Development" ,
				baseurl : these.hostname() , 
				client  : app.locals.clientip 
			}

			// see local env
			//console.log(app.locals)

			var checksessionid = req.session.userid
			if ( checksessionid != undefined ) {
				res.render( view + "home/index" , objRender )
			} else {
				res.render( view + "home/login" , objRender )
			}
		})


		// welcome page reloaded
		app.get( "/welcome" , function (req  , res) {
			var objRender = {
				req     : req , 
				res     : res , 
				title   : "CTI Development" ,
				baseurl : these.hostname()
			}

			var checksessionid = req.session.userid
			if ( checksessionid != undefined ) {
				res.render( view + "home/welcome" , objRender )
			} else {
				res.render( view + "home/formlogin" , objRender )
			}
		})
	} ,


	MenuBar : function () {


		/**
		 * [description]
		 * @param  {[type]} req [description]
		 * @param  {[type]} res )             {			res.render( view + "pages/chat" )		} [description]
		 * @return {[type]}     [description]
		 */
		app.get( "/userchat" , function ( req , res ) {
			var userchat = controls.require( "Userchat" , controls.reqres(req,res) , "Chat")
			userchat.index()
		})


		/**
		 * [description]
		 * @param  {[type]} req [description]
		 * @param  {[type]} res )             {			res.render( view + "pages/cti" )		} [description]
		 * @return {[type]}     [description]
		 */
		app.get("/cti" , function ( req , res ) {
			var cti = controls.require( "CTI" , controls.reqres(req,res) , "Chat" )
			cti.index()
		})


		/**
		 * [description]
		 * @param  {[type]} req [description]
		 * @param  {[type]} res )             {			res.render( view + "pages/doc_chat" )		} [description]
		 * @return {[type]}     [description]
		 */
		app.get("/docchat" , function ( req , res ) {
			var docchat = controls.require( "Docchat" , controls.reqres(req,res) , "Chat" )
			docchat.index()
		})

		/**
		 * [description]
		 * @param  {[type]} req [description]
		 * @param  {[type]} res )             {			res.render( view + "pages/doc_cti" )		} [description]
		 * @return {[type]}     [description]
		 */
		app.get("/doccti" , function ( req , res ) {
			var doccti = controls.require( "Doccti" , controls.reqres(req,res) , "Chat" )
			doccti.index()
		})


	} , 


	Auth : function () {

		/**
		 * [description]
		 * @param  {[type]} req [description]
		 * @param  {[type]} res )             {			res.render( view + "pages/doc_cti" )		} [description]
		 * @return {[type]}     [description]
		 */
		app.post("/login" , function ( req , res ) {
			var login = controls.require( "Login" , controls.reqres(req,res) , "Login" )
			login.index()
		})

		/**
		 * [description]
		 * @param  {[type]} req [description]
		 * @param  {[type]} res )             {			res.render( view + "pages/doc_cti" )		} [description]
		 * @return {[type]}     [description]
		 */
		app.get("/login/out" , function ( req , res ) {
			if ( req.session.userid != undefined ) {
				req.session.destroy()
				res.redirect("/")

			} 


		})

	} , 


	/**
	 * [hostname description]
	 * @return {[type]} [description]
	 */
	hostname : function () {
		return app.locals.fullurl
	} , 

	/**
	 * [clientip description]
	 * @return {[type]} [description]
	 */
	clientip : function () {
		return app.locals.clientip
	} , 


	Library : function () {
		
		// get all js and css by library /view/library/js
		app.get("/library/js/:file" , function ( req , res ) {
			var request = req.params
			var filename = request.file
			var filename_js  = view + "/library/js/" + filename 

			fs.exists( filename_js , (exists) =>  {
				if ( exists ) {
					res.sendFile( filename_js )
				} else {
					res.send('What you find? File not found Bruh!')
				}
			})

		})

		// get all js and css by library /view/library/css
		app.get("/library/css/:file" , function ( req , res ) {
			var request = req.params
			var filename = request.file
			var filename_css = view + "/library/css/" + filename 

			fs.exists( filename_css , (exists) =>  {
				if ( exists ) {
					res.sendFile( filename_css )
				} else {
					res.send('What you find? File not found Bruh!')
				}
			})
		})

		// get all fonts by library /view/library/fonts
		app.get("/library/fonts/:file" , function ( req , res ) {
			var request = req.params
			var filename = request.file
			var filename_fonts = view + "/library/fonts/" + filename 

			fs.exists( filename_fonts , (exists) =>  {
				if ( exists ) {
					res.sendFile( filename_fonts )
				} else {
					res.send('What you find? File not found Bruh!')
				}
			})
		})

		// get all img by library /view/library/img
		app.get("/library/img/:file" , function ( req , res ) {
			var request = req.params
			var filename = request.file
			var filename_img = view + "/library/img/" + filename 

			fs.exists( filename_img , (exists) =>  {
				if ( exists ) {
					res.sendFile( filename_img )
				} else {
					res.send('What you find? File not found Bruh!')
				}
			})
		})



	} , 





}