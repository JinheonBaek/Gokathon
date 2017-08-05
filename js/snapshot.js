// webcamSnapshot
// Webcam snapshot library using webcam.js in JavaScript 

//Taking snapshot
function snapshot(data) {
	Webcam.snap(
		function(data_uri) {
			var raw_image_data = data.replace(/^data\:image\/\w+\;base64\,/, '');
			var time = new Date();
			var usrName = document.getElementById('usrname').value;
			var imgName = usrName + time.getTime() + '.jpg';
			
			//Upload snapshot image on server for jpeg format
			$(function() {
				var formData = new FormData();
				formData.append('mydata', raw_image_data);
				formData.append('imgname', imgName);

				$.ajax( {
					url: 'upload.php',
					data: formData,
					async: false,
					processData: false,
					contentType: false,
					type: 'POST',
					success: function(data) {
						document.getElementById('resultsInfo').innerHTML = 'The image data is uploaded to the server';
						alert("업로드 성공")
						analyzingFace(usrName, imgName, findSimilar);
					},
					error: function(error) {
						document.getElementById('resultsInfo').innerHTML = "Error!";
						alert(error);
					}
				}); 
			}); 				
		}
	);
}