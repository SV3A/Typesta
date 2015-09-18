(function($) {
	$(document).ready(function() {

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

			function loadText() {
				// Adds a span around each character after removing multiple instances of spaces,
				// and counts total number of words.
				$elem = $('.text-to-be-typed');
				var chars = jQuery.map($elem.text().replace(/\s\s+/g, ' ').split(''), function(c) {
					return '<span class="">' + c + '</span>';
				});
				$elem.html(chars.join(''));
				lettersTotal = parseInt($('.text-to-be-typed span').length);
				return;
			}

			function initialMarkup() {
				// Marks the text modified by loadText with nesecary CSS.
				var mark = $('.typing-window p');
				cur = mark.children(':first-child').addClass('first');
				mark.children(':last-child').addClass('last');
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

			function keyBoard() {
				// Handles all the keyboard input from the user 
				// Typing function
				$(document).keypress(function(type) {
					type.preventDefault();
					if (type.which == cur.text().charCodeAt(0)) {
						cur.addClass('ok');
					} else {
						cur.addClass('fail');
						// Play fail sound
						if (soundOn === true) {
							failAudio.play();
						}
						++errors;
					}
					cur.removeClass('current-letter');
					++typed;
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
							--typed;
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

			// Return object exposed to the user
			return {
				initGame: function() {
					loadText();
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

		// FIRE ON LOAD
		TypingTutor.initGame();

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
})(jQuery);