// this content created by www.visualandcode.com
//  author : Ahmad Wahyudin
//  powered by : jQuery


// common function
function dbug (data) {
	console.log(data);
}

// alert alternative
function echo ( data ) {
	alert(data);
}

function trim(x) {
    return x.replace(/^\/|\/$/g, '');
}

var mainjs =  function () {};
	window.document.mainjs = mainjs;
// main js prototyping
if ( typeof mainjs == "function" ) 
{	

	/**
	 * [loader description]
	 * @param  {[type]} contentloader [description]
	 * @return {[type]}               [description]
	 */
	mainjs.prototype.loader = function ( linkcontentloader ) {
		var containers   = $(".loadcontent");
		var divcontainer = "<div style='width:100%;margin-top:100px;' align='center'>";
		divcontainer     += "<img src='"+window.document.baseurl+"library/img/loader-gif.gif'>";
		divcontainer     += "</div>";

		var urlgetcontent = window.document.baseurl;
		if ( linkcontentloader.length > 0 ) {
			urlgetcontent = window.document.baseurl + trim(linkcontentloader);
		}

		var getcontentajax = {
			url : urlgetcontent , 
			type : "GET" ,
			dataType : "html" , 
			success : function (data) {
				setTimeout(function () {
					$(".loadcontent").html(data);
				} , 1000)
			} , 

			beforeSend : function () {
				$(containers).html(divcontainer);
			}
		} 

		$.ajax(getcontentajax);
	}

	/**
	 * [replacefunctionlink description]
	 * @return {[type]} [description]
	 */
	function replacefunctionlink ( proto_mainjs ) {
		$("body").on("click" , "a" , function (e) {
			e.preventDefault();
			var attributeHref = $(this).attr("href");
			if ( attributeHref == "#" ) {
				
			} else {
				if ( attributeHref == "/" ) {
					attributeHref = '/welcome';
				} else if ( attributeHref == '/login/out' ) {
					window.location.href = "/login/out";
				} else {
					proto_mainjs.loader(attributeHref);
				}
			}
		});

	}


	function formSubmit () {
		$("body").on("submit" , "form" , function (e) {
			e.preventDefault();
			var attrAction = $(this).attr("action");
			var urlPost = window.document.baseurl;
			if ( attrAction.length > 0 ) {
				urlPost += attrAction;
				var dataSend = $(this).serialize();
				var SendParamPost = {

					url : urlPost , 
					type : "POST" , 
					dataType : "json" , 
					data : dataSend , 
					success : function (data) {
						console.log(data);
					}

				}

				$.ajax(SendParamPost);

			}

			return false;
		});
	}
}

$(function () {
	var mainjsexec = new mainjs();
	// describe below
	mainjsexec.loader("/welcome");	
	new replacefunctionlink(mainjsexec);	
	new formSubmit();
})