module.exports = function () {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '' , 
		database : 'visualandcode_chatcti'
	});

	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    return;
	  }
	 
	  console.log('connected as id ' + connection.threadId);
	});

	return connection
}