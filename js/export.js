 //code copied from https://jsfiddle.net/cowboy/hHZa9/

 var tasksFromTable = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));

 $('#btnExport').append($('<a href="data:' + tasksFromTable + '" download="data.json">Download</a>'));

 /*

 var link = $('<a>').text("Download");

 link.on('click', function(ev) {
     link.attr("href",tasksFromTable);
     link.attr("download","data.json");
 }, false);

 $("#btnExport").append(link);



 */

 //event on input (type file),import file
 $("#btnImport").on('click', function () {

 	$("#file").trigger("click");
 });



 $("#file").on('change', function () {

 	var file = document.querySelector('input[type=file]').files[0]

 	//this line of code is from net https://stackoverflow.com/questions/15201071/how-to-get-full-path-of-selected-file-on-change-of-input-type-file-using-jav
 	var pathOfTheImportedFile = URL.createObjectURL(file);


 	$.getJSON(pathOfTheImportedFile, function (package) {

 		try {

 			storeFromFileToList(package);

 		} catch (e) {

 			console.log(e.message);
 		}

 	});

 });

 //after uploading file store it on list
 function storeFromFileToList(dataFromJsonFile) {
 	for (let i = 0; i < dataFromJsonFile.length; i++) {

 		let text = dataFromJsonFile[i]["text"];
 		let checkboxValue = dataFromJsonFile[i]["checkboxValue"];
 		const newRow = createRow(text, checkboxValue, deleteRow, completeTask);
 		let indexOfElement = indexOfElementInArray(newRow);



 		//append row if doesn't exist
 		if (indexOfElement === -1) {

 			tbody.append(newRow);
 			addRowToArray(newRow);
 		}

 	}

 }
