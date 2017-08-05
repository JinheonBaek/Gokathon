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

// analyzingFace
function analyzingFace(usrName, imgName, findSimilar) {
	var imgPath = "https://Gokathon.azurewebsites.net/img/"+ imgName;

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
			var faceId = data[0]['faceId'];
			findSimilar(faceId);
		})
		.fail(function() {
			alert("error");
		});
	});
}

function findSimilar(faceId) {
	var faceListId = "celebrity";

	$(function() {
		var params = {
			// Request parameters
		};

		$.ajax({
			url: "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/findsimilars?" + $.param(params),
			beforeSend: function(xhrObj){
				// Request headers
				xhrObj.setRequestHeader("Content-Type","application/json");
				xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
			},
			type: "POST",
			async: false,
			// Request body
			data: "{" +
				"\"faceID\":\"" + faceId + "\"," +
				"\"faceListID\":\"" + faceListId + "\"," +
				"\"maxNumOfCandidatesReturned\":" + 10 + "," +
				"\"mode\":\"matchPerson\"" +
			"}",
		})
		.done(function(data) {
			alert("success");
		})
		.fail(function() {
			alert("error");
		});
	});
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
			printFaceList(data);
        })
        .fail(function() {
            alert("error");
        });
	});
}

function printFaceList(data) {
	faceList = data['persistedFaces'];
	for (x=0; x < faceList.length; x++) {
		document.getElementById('faceLst').innerHTML += "<img src=\"https://Gokathon.azurewebsites.net/celebrity/" + faceList[x].userData + ".jpg\" width=\"50\">" ;
		document.getElementById('faceLst').innerHTML += faceList[x].userData + '-';
		document.getElementById('faceLst').innerHTML += faceList[x].persistedFaceId + '<br>';
	}
}