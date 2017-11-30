$(function () {
	var sock = io();

	var objsendEmmit = {
		message : "Allah Almighty God!" , 
		for     : "127.0.0.1"
	}
	sock.emit( "message" , objsendEmmit );

	sock.on('noticeip' , function (data) {
		setTimeout(function () {
			$(".noticeip").css("display" , "none");
		} , 1000)

		setTimeout(function () {
			$(".noticeip").fadeIn();
		} , 1000)

		$(".noticeip").html(data.message);
	})
	
})