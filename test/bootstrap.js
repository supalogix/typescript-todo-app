module.exports = (function() {
	return {
		getDir: getDir,
		getFile: getFile
	};

	function getDir( dirname ) {
		return {
			getFile: getFile
		};

		function getFile( file ) {
			fs = require('fs');
			path = require('path');
			new_file = path.resolve( dirname, file );

			return fs.readFileSync( new_file, 'utf-8'); 
		}
	}

	function getFile( file ) {
		fs = require('fs')
		return fs.readFileSync(file,'utf-8');
	}
})();
//exports.todo = {
//	log: function() {
//		console.log("hello world");
//	},
//	include: function( dirname, file ) {
//		fs = require('fs');
//		path = require('path');
//		new_file = path.resolve( dirname, file );
//
//		return fs.readFileSync( new_file, 'utf-8'); 
//	}
//};
