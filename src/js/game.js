var $ = require('jquery');
var Chartist = require('./chartist/chartist.js');
var LoadText = require('./loadtxt.js');
var KeyboardSimulator = require('./keyboardsimulator.js');

var TypingTutor = (function() {
	var typed,
		errors,
		calcProg,
		tenth,
		soundOn = false,
		wpmTimer,
		progressTimer,
		elapsedSeconds,
		timer,
		lettersTotal,
		charCodes = [],
		wpmPoints = [],
		timePoints = [],
		failAudio = new Audio('audio/pew.mp3'),
		cur = $(),
		wpmCount = $('.hud .hud-item .wpm'),
		accuCount = $('.hud .hud-item .accu'),
		progressBar = $('.meter span'),
		starsContainer = $(".results-window .stars p"),
		clockElement = $('.typing-window .clock p');

	function resetValues() {
		typed = 0;
		errors = 0;
		calcProg = 0;
		tenth = 0;
		elapsedSeconds = 0;
		wpmPoints = [];
		timePoints = [];
	}

	function initialMarkup() {
		lettersTotal = parseInt($('.text-to-be-typed span').length);
		// Marks the text modified by loadText with nesecary CSS.
		var mark = $('.typing-window p');
		cur = mark.children(':first-child').addClass('first');
		mark.children(':last-child').addClass('last');
		charCodes = LoadText.getCharcodes();
		return;
	}

	function startGame() {
		// Starts the game by resetting vars, animates the game's control-buttons,
		// adds current letter and starts timing functions.
		$('html, body').animate({
			scrollTop: $('#top').offset().top
		}, 100);
		resetValues();
		cur.addClass('current-letter');
		keyBoardGuidance.resetGuide();
		keyBoardGuidance.getNext();
		$(document).one("keypress", function() {
			startTimer();
			setTimeout(updateWpm, 1005);
			updateProgress();
		});
		keyBoard();
		return;
	}

	function resetGame() {
		// Stops main timer, resets document CSS and runs startGame.
		clearInterval(timer);
		clearTimeout(wpmTimer);
		starsContainer.empty();
		clockElement.text("00:00");
		accuCount.text("100.0");
		wpmCount.text("0");
		$(document).off();
		$('.results-window')
			.removeClass('show-results');
		$('.text-to-be-typed span')
			.removeClass('fail ok');
		cur.removeClass('current-letter');
		cur = $('.first');
		startGame();
		return;
	}

	function levelComplete() {
		// Fires when user types last letter, stops listening for keyboard input,
		// stop updating stats and displays graph with displayResults.
		$(document).off();
		clearInterval(timer);
		clearTimeout(wpmTimer);
		displayResults();
		updateAccu();
		keyBoardGuidance.resetGuide();
		return;
	}

	function startTimer() {
		// Keeps and formats time.
		var min,
			sec = 0;
		timer = setInterval(function() {
			++sec;
			++elapsedSeconds;
			min = Math.floor(elapsedSeconds / (60));
			min = min < 10 ? "0" + min : min;
			sec = sec == 60 ? 0 : sec;
			sec = sec < 10 ? "0" + sec : sec;
			clockElement.text(min + ":" + sec);
		}, 1000);
		return;
	}
	var
		altKey,
		leftShiftKey,
		rightShifKey,
		fingerToUse;

	var keyBoardGuidance = {
		failAnimation: function(failSelector) {
			failSelector.addClass("key-guide-fail")
				.delay(700).queue(function() {
					$(this).removeClass("key-guide-fail");
					$(this).dequeue();
				});
		},
		handAnimation: function(keyToFinger){
			fingerToUse = keyToFinger.data("finger");
			if (fingerToUse <= 5) {
				$("#left-hand div").toggleClass("finger-" + fingerToUse);
			} else {
				$("#right-hand div").toggleClass("finger-" + fingerToUse);
			}
		},
		resetGuide: function() {
			$(".keyboard .top-row div").removeClass("key-guide-nxt");
			$("#left-hand div").removeClass("finger-" + fingerToUse);
			$("#right-hand div").removeClass("finger-" + fingerToUse);
			$("#right-hand div").removeClass("finger-10");
			$("#left-hand div").removeClass("finger-1");
			altKey = $(".keyboard .top-row div[data-key='altgr']");
			leftShiftKey = $(".keyboard div[data-key='leftshiftkey']");
			rightShiftKey = $(".keyboard .top-row div[data-key='rightshiftkey']");
		},
		getNext: function() {
			if ($(".keyboard .top-row div[data-key='" + charCodes[typed] + "']").length) {
				$(".keyboard .top-row div[data-key='" + charCodes[typed] + "']").toggleClass("key-guide-nxt");

				keyBoardGuidance.handAnimation($(".keyboard .top-row div[data-key='" + charCodes[typed] + "']"));

			} else if ($(".keyboard .top-row div[data-shift='" + charCodes[typed] + "']").length) {
				$(".keyboard .top-row div[data-shift='" + charCodes[typed] + "']").toggleClass("key-guide-nxt");

				keyBoardGuidance.handAnimation($(".keyboard .top-row div[data-shift='" + charCodes[typed] + "']"));

				if ($(".keyboard .top-row div[data-shift='" + charCodes[typed] + "']").data("finger") > 5) {
					leftShiftKey.toggleClass("key-guide-nxt");
					$("#left-hand div").toggleClass("finger-1");
				} else {
					rightShiftKey.toggleClass("key-guide-nxt");
					$("#right-hand div").toggleClass("finger-10");
				}
			} else {
				altKey.toggleClass("key-guide-nxt");
				$(".keyboard .top-row div[data-alt='" + charCodes[typed] + "']").toggleClass("key-guide-nxt");
				keyBoardGuidance.handAnimation($(".keyboard .top-row div[data-alt='" + charCodes[typed] + "']"));
			}
		},
		showFail: function(key) {
			if ($(".keyboard div[data-key='" + key + "']").length) {
				keyBoardGuidance.failAnimation($(".keyboard div[data-key='" + key + "']"));
			} else if ($(".keyboard div[data-shift='" + key + "']").length) {
				keyBoardGuidance.failAnimation($(".keyboard div[data-shift='" + key + "']"));

				if ($(".keyboard .top-row div[data-shift='" + key + "']").data("finger") > 5) {
					keyBoardGuidance.failAnimation(leftShiftKey);
				} else {
					keyBoardGuidance.failAnimation(rightShiftKey);
				}
			} else {
				keyBoardGuidance.failAnimation($(".keyboard div[data-alt='" + key + "']"));
				keyBoardGuidance.failAnimation(altKey);
			}
		}
	};

	function keyBoard() {
		// Handles all the keyboard input from the user 
		// Typing function
		$(document).keypress(function(type) {
			type.preventDefault();
			if (type.which === charCodes[typed]) {
				cur.addClass('ok');
			} else {
				cur.addClass('fail');
				if (soundOn === true) {
					failAudio.play();
				}
				++errors;
				keyBoardGuidance.showFail(type.which);
			}

			cur.removeClass('current-letter');
			keyBoardGuidance.getNext();
			++typed;
			keyBoardGuidance.getNext();

			// Is the game finished?
			if (typed != lettersTotal) {
				cur = cur.next().addClass('current-letter');
			} else {
				levelComplete();
			}
			return;
		});

		// Delete funtion
		$(document).keydown(function(goback) {
			if (goback.which == 8) {
				goback.preventDefault();
				// Has the game started or is it over?
				if (!cur.hasClass('first') && !cur.hasClass('last')) {
					cur.removeClass('current-letter fail ok');
					cur = cur.prev();
					cur
						.addClass('current-letter')
						.removeClass('fail ok');
					keyBoardGuidance.getNext();
					--typed;
					keyBoardGuidance.getNext();
				}
			} else if (goback.which == 32) {
				updateAccu();
			}
			return;
		});
	}

	function updateWpm() {
		var calcWpm = (((typed / 5) / elapsedSeconds) * 60).toFixed(0);
		wpmCount.text(calcWpm);
		if (calcProg >= tenth) {
			wpmPoints.push(calcWpm);
			timePoints.push(elapsedSeconds);
			tenth += 10;
		}
		wpmTimer = setTimeout(updateWpm, 800);
		return;
	}

	function updateAccu() {
		accuCount.text((100 - ((errors / lettersTotal) * 100)).toFixed(1));
		return;
	}

	function updateProgress() {
		calcProg = ((typed / lettersTotal) * 100).toFixed(1);
		progressBar.css({
			"width": calcProg + "%"
		});
		// ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! !  C O N S O L E   L O G
		/*
		console.log([
			"Typed:",typed,
			"Ers:",errors, 
			"x-data:",timePoints,
			"y-data:",wpmPoints,
			"progr:",calcProg,
			"q:",tenth
			]); 
		*/
		progressTimer = setTimeout(updateProgress, 200);
		return;
	}

	function calcWavg(total) {
		var wpmAvg;
		for (var i = 0; i < wpmPoints.length; i++) {
			total += parseInt(wpmPoints[i], 10);
		}
		wpmAvg = (total / wpmPoints.length).toFixed(0);
		return wpmAvg;
	}

	function starsScore(wpmAvg) {
		var fillStars,
			motivate;
		switch (true) {
			case (wpmAvg < 30):
				fillStars = 0;
				motivate = "Du har ikke lige frem travlt, hva? :)";
				break;
			case (wpmAvg >= 30 && wpmAvg < 40):
				fillStars = 1;
				motivate = "Du har ikke lige frem travlt, hva? :)";
				break;
			case (wpmAvg >= 40 && wpmAvg < 45):
				fillStars = 2;
				motivate = "Rom blev ikke bygget på én dag :)";
				break;
			case (wpmAvg >= 45 && wpmAvg < 55):
				fillStars = 3;
				motivate = "Ikke så ringe endda, keep it up!";
				break;
			case (wpmAvg >= 55 && wpmAvg < 75):
				fillStars = 4;
				motivate = "Slet ikke dårligt, men der er plads til forbedring...";
				break;
			case (wpmAvg >= 75 && wpmAvg < 85):
				fillStars = 5;
				motivate = "I've tought you well!";
				break;
			case (wpmAvg >= 85):
				fillStars = 6;
				motivate = "WOW.. Du er jo en ninja ved et tastatur!";
				break;
		}
		for (var i = 0; i < fillStars; i++) {
			starsContainer.append("<i class='fa fa-star'></i>");
		}
		for (; fillStars < 6; fillStars++) {
			starsContainer.append("<i class='fa fa-star-o'></i>");
		}
		$('.motivation-message p').text(motivate);
		return;
	}

	function displayResults() {
		// Show the results when the level is complete.
		var maxWpm,
			wpmAvg;
		wpmAvg = calcWavg(0);
		maxWpm = Math.max.apply(Math, wpmPoints);
		$('.wpm-avg p .result').text(wpmAvg);
		$('.wpm-max p .result').text(maxWpm);
		$('.accu-two p .result').text((100 - ((errors / lettersTotal) * 100)).toFixed(2));
		starsScore(wpmAvg);
		$('html, body').animate({
			scrollTop: $('.results-window').offset().top
		}, 500, function() {
			$('.results-window').addClass('show-results');
		});

		var chart = Chartist.Line('#results-chart', {
			labels: timePoints,
			series: [
				wpmPoints
			]
		}, {
			height: 300,
			fullWidth: true,
			chartPadding: {
				right: 40
			}
		});
		return;
	}

	return {
		initGame: function(textType) {
			if (textType == "regularText") {
				LoadText.regular('.text-to-be-typed');
			}
			KeyboardSimulator.loadKeyboard("dk");
			initialMarkup();
			isStarted = false;
			return isStarted;
		},

		startGame: function() {
			$('#start-button')
				.css({
					"display": "none"
				});
			$('#restart-button')
				.addClass('show-reset');
			$('.game-main-window .tip')
				.hide();
			$(".hands").slideDown( 200 );
			startGame();
			isStarted = true;
			return isStarted;
		},

		restartGame: function() {
			resetGame();
			return;
		},

		toggleSound: function() {
			if (soundOn === false) {
				$('.typing-window .volume-box i').removeClass('off');
				soundOn = true;
			} else {
				$('.typing-window .volume-box i').addClass('off');
				soundOn = false;
			}
			return;
		}
	};
})();

module.exports = TypingTutor;