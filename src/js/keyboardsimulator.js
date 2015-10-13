/* jshint node: true */
'use strict';
var $ = require('jquery');

var keySimulator = (function() {
	function loadKeyboard (lang) {
		$("#keyboard-wrapper").load("keyboards/"+lang+"layout.html");
	}
	var keyBoardGuidance = {
		failAnimation: function(failSelector) {
			failSelector.addClass("key-guide-fail")
				.delay(700).queue(function() {
					$(this).removeClass("key-guide-fail");
					$(this).dequeue();
				});
		},
		handAnimation: function(){
		},
		resetGuide: function() {
		},
		getNext: function() {
		}
	};
	return {
		loadKeyboard: loadKeyboard,
		keyBoardGuidance: keyBoardGuidance
	};
})();

module.exports = keySimulator;