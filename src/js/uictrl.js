/* jshint node: true */
'use strict';
var $ = require('jquery');

var UICtrl = (function() {

	function showFrSocial(selector) {
		$(selector).delay(2000).fadeIn();
	}

	function slideNav() {
		$('#nav-buttons').click(function() {
			$('#nav-buttons .ham').toggleClass('hide-ham');
			$('#nav-buttons .close-menu').toggleClass('close-menu-hidden');
			$('nav').toggleClass('active');
			$('.dim').toggle();
		});
		$('.dim').click(function() {
			$('#nav-buttons .ham').toggleClass('hide-ham');
			$('#nav-buttons .close-menu').toggleClass('close-menu-hidden');
			$('nav').toggleClass('active');
			$('.dim').toggle();
		});
	}
	return {
		showFrontSocial: showFrSocial,
		navToggle: slideNav
	};
})();

module.exports = UICtrl;