//Cog

//Config
var subscriptionKey = "39e75e2ea70c4d14b70e4c29d3d61fde";

//Enroll Face to Face List
function addFace() {
	var usrName = document.getElementById('celname').value;
	var imgPath = document.getElementById('url').value;
	var faceListId = "celebrity";
	
	$(function() {
		var params = {
			// Request parameters
			"userData": usrName,
			//"targetFace": "{string}",
		};

		$.ajax({
			url: "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/facelists/" + faceListId + "/persistedFaces?" + $.param(params),
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

// Get FaceID
function getFaceId(imgName) {
	var imgPath = "http://jinheon.azurewebsites.net/VerifyFace/image/"+ imgName;

	$(function() {
		var params = {
			// Request parameters
			"returnFaceId": "true",
			"returnFaceLandmarks": "false",
			//"returnFaceAttributes": "{string}",
		};
		$.ajax( {
			url: "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
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
			"\"}"
		})
		.done(function(data) {
			var str = JSON.stringify(data);
			faceId = str.split(":").toString().split(",");
		})
		.fail(function() {
			alert("error");
		});
	});

	return faceId[1];
}

function getFaceList() {
    $(function() {
        var params = {
            // Request parameters
        };
      
        $.ajax({
            url: "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/facelists/celebrity?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
			type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
			alert("success");
        })
        .fail(function() {
            alert("error");
        });
	});
	return data;
}