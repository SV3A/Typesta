var $ = require('jquery');
var TypingTutor = require('./typingtutor.js');

$(document).ready(function() {

	// FIRE ON LOAD
	TypingTutor.initGame();
	console.log("HEJ!lolss")

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

	// UI
	// - - - - - - - - - - - - - - - - - - - - - -
	$('.social-links').delay(2000).fadeIn();
	$('#nav-buttons').click(function(event) {
		$('#nav-buttons .ham').toggleClass('hide-ham');
		$('#nav-buttons .close-menu').toggleClass('close-menu-hidden');
		$('nav').toggleClass('active');
		$('.dim').toggle();
	});
	$('.dim').click(function(event) {
		$('#nav-buttons .ham').toggleClass('hide-ham');
		$('#nav-buttons .close-menu').toggleClass('close-menu-hidden');
		$('nav').toggleClass('active');
		$('.dim').toggle();
	});

});
