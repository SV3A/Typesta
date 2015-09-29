var $ = require('jquery');
var UICtrl = require('./uictrl.js');
var TypingTutor = require('./game.js');

$(document).ready(function() {


	TypingTutor.initGame("regularText");

	// START GAME
	// - - - - - - - - - - - - - - - - - - - - - -
	$('#start-button').click(function() {
		if (isStarted === false) {
			TypingTutor.startGame();
			this.blur();
		}
	});
	$('.tw-frontpage').click(function() {
		if (isStarted === false) {
			TypingTutor.startGame();
			this.blur();
		}
	});

	$(document).keyup(function(e) {
		if (e.which == 13 && isStarted === false) {
			TypingTutor.startGame();
		}
	});
	// RESTART GAME
	// - - - - - - - - - - - - - - - - - - - - - -
	$('#restart-button').click(function() {
		if (isStarted === true) {
			TypingTutor.restartGame();
			this.blur();
		}
	});
	// Control the sound
	// - - - - - - - - - - - - - - - - - - - - - -
	$('#sound-button').click(function() {
		TypingTutor.toggleSound();
		this.blur();
	});


	UICtrl.showFrontSocial('.social-links');
	UICtrl.navToggle();

});