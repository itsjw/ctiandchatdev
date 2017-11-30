module.exports = {

	reqres : function ( req , res ) {
		var return_value = {
			req : req , 
			res : res
		};

		return return_value 
	} ,

	/**
	 * [clientip description]
	 * @param  {[type]} ip [description]
	 * @return {[type]}    [description]
	 */
	clientip : function ( ip ) {
		var ipaddressclient
		if ( ip.indexOf(":") > -1 ) {
			var ip_exp = ip.split(":")
			var ip = ip_exp[3]
			if ( ip.indexOf(".") > -1 ) {
				ipaddressclient = ip
			}
		}
		return ipaddressclient
	} , 

	/**
	 * [require description]
	 * @param  {[type]} modulename [description]
	 * @param  {[type]} data       [description]
	 * @return {[type]}            [description]
	 */
	require : function ( modulename , data , modelname ) {
		global.req 		   = data.req
		global.res 		   = data.res
		var controllerName = controller + modulename + ".js"

		// collect url
		app.locals.hostip   = req.get('host')
		app.locals.clientip = this.clientip(req.connection.remoteAddress)

		if ( modelname != undefined ) {
			var modelnames 	   = model + "M_" + modelname + ".js"
			global.db 	       = require(modelnames)
		} else {
			//console.log("Model Not found!")
		}

		// catch file
		var fileLocation = 0
		fs.exists( controllerName , (exists) => {
			if ( exists ) {
				fileLocation += 1
			} 
		})	

		global.requirefiles = require(controllerName)
		return requirefiles
	}

}	