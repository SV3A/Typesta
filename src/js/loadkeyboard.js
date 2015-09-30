var $ = require('jquery');

var LoadKeyboard = (function() {
	function dk() {
		$("#keyboard-wrapper").load("keyboards/dklayout.html");
	}
	return {
		dk: dk
	};
})();

module.exports = LoadKeyboard;