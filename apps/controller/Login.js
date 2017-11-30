module.exports = {


	index : function () {
		req.session.userid = 1
		db.ActionLogin()
	} 

}