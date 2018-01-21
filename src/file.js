const dropZone = $('#drop-zone');

$(document).on('dragover', function(event) {
	event.stopPropagation();
	event.preventDefault();

	dropZone.removeClass('hidden');
});

dropZone.on('dragleave', function(event) {
	event.stopPropagation();
	event.preventDefault();

	dropZone.addClass('hidden');
});

// dropZone.on('dragover', function(e) {
// 	e.stopPropagation();
// 	e.preventDefault();
// 	e.originalEvent.dataTransfer.dropEffect = 'copy';
// });

// // Get file data on drop
// dropZone.on('drop', function(e) {
// 	e.stopPropagation();
// 	e.preventDefault();


// 	if(e.originalEvent.dataTransfer.items){
// 		// For chrome users folder upload is supported

// 		var items = e.originalEvent.dataTransfer.items;
// 		for(var j=0; j<items.length; j++){
// 			var item = items[j].webkitGetAsEntry();
// 			if(item){
// 				traverseFileTree(item);
// 			}
// 		}
// 	}
// 	else{
// 		// Other browser users have to upload files directly

// 		var files = e.originalEvent.dataTransfer.files;

// 		for(var j=0; j<files.length; j++){
// 			if(files[j].type.match(/audio\/(mp3|mpeg)/)){

// 				getID3Data(files[j], function (song) {
// 					allTracks.push(song);
// 					playlist.push(song);
// 					$('#list').append($(returnTrackHTML(song, playlist.length-1)));
// 				});
// 			}
// 		}
// 	}

// 	dropZone.addClass('hidden');
// });

// function traverseFileTree(item,path) {
// 	path = path || "";
// 	if(item.isFile){
// 		item.file(function(file){
// 			if(file.type.match(/audio\/mp3/)){
// 				getID3Data(file, function (song) {
// // 					song

					
					
// 				});
// 				readFile(file, function(result){
// 					conole.log(file);
// 					conole.log(result);
// 						result = file;
// 						wavesurfer.loadBlob(result);
// 				});
// 			}
// 		})
// 	}
// }
