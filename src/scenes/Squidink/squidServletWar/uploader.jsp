<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Java Ajax Servlet File Upload</title>
</head>
<body>

	<form method="post" action="fileuploadservlet" enctype="multipart/form-data">
		<input type="file" name="file" />
		<input type="submit" value="Upload" />
		
		
	</form>

	<h4>This is Ajax!</h4>
	<input id="ajaxfile" type="file"/> <br/>
	<button onclick="uploadFile()">Upload</button>
	
	<script>
	async function uploadFile() {
		let formData = new FormData();
		formData.append("file", ajaxfile.files[0]);
		await fetch('fileuploadservlet', {
			method: "POST",
			body: formData
		});
		alert('The file upload with Ajax and Java was a success!');
	}
	</script>
	
</body>
</html>