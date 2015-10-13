/* jshint node: true */
'use strict';
var $ = require('jquery');
var UICtrl = require('./uictrl.js');
var TypingTutor = require('./game.js');

$(document).ready(function() {
	var isStarted = false;

	TypingTutor.initGame("regularText");

	// START GAME
	// - - - - - - - - - - - - - - - - - - - - - -
	$('#start-button').click(function() {
		if (isStarted === false) {
			TypingTutor.startGame();
			this.blur();
			isStarted = TypingTutor.gameState();
		}
	});
	$('.tw-frontpage').click(function() {
		if (isStarted === false) {
			TypingTutor.startGame();
			this.blur();
			isStarted = TypingTutor.gameState();
		}
	});

	$(document).keyup(function(e) {
		if (e.which == 13 && isStarted === false) {
			TypingTutor.startGame();
			isStarted = TypingTutor.gameState();
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
	$('#close-result-window').click(function() {
			$('.results-window').fadeOut();
			this.blur();
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