var $ = require('jquery');

var LoadText = (function() {
	var charCodes = [];
	function loadRegularTxt(txtSelector) {
		// Adds a span around each character after removing multiple instances of spaces
		$elem = $(txtSelector);
		var chars = $.map($elem.text().replace(/\s\s+/g, ' ').split(''), function(c) {
			charCodes.push(c.charCodeAt(0));
			return '<span class="">' + c + '</span>';
		});
		//console.log(charCodes);
		$elem.html(chars.join(''));
		return;
	}

	function getCharcodes(){
		return charCodes;
	}
	return {
		regular: loadRegularTxt,
		getCharcodes: getCharcodes
	};
})();

module.exports = LoadText;