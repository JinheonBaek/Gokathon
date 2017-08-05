//Cog

function addFace(usrName) {
	var faceListId = "celebrity";
	var subscriptionKey = "39e75e2ea70c4d14b70e4c29d3d61fde";
	//var imgPath = "http://jinheon.azurewebsites.net/EnrollFace/image/" + usrName + '.jpg';

	$(function() {
		var params = {
			// Request parameters
			"userData": usrName,
			//"targetFace": "{string}",
		};

		$.ajax({
			url: "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/facelists/{faceListId}/persistedFaces?" + faceListId + "/persistedFaces?" + $.param(params),
			beforeSend: function(xhrObj){
				// Request headers
				xhrObj.setRequestHeader("Content-Type","application/json");
				xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
			},
			type: "POST",
			async: false,
			// Request body
			data: "{" +
				"\"url\":\"" + imgPath +
			"\"}",
		})
		.done(function(data) {
			alert("success");
		})
		.fail(function() {
			alert("error");
		});
	});
}