(function($) {
	$(document).ready(function() {

		var TypingTutor = (function () {
			// privates
			var all = 0,
				cur = $(), // Set in initialMarkup
				typed = 0,
				errors = 0,
				calcPro = 0,
				quarter = 10.0,
				soundOn = false,
				wpmTimer,
				progressTimer,
				lettersTotal = 0, // Set in loadText
				wpmPoints = [
				],
				timePoints = [
				],
				wpmCount = $( '.hud .hud-item .wpm' ),
				accuCount = $('.hud .hud-item .accu'),
				progressBar = $( '.meter span' ),
				clockElement = $( '.typing-window .clock p' ),
				failAudio = new Audio('pew.mp3');

			function loadText () {
				// Adds a span around each character after removing multiple instances of spaces
				$elem = $('.text-to-be-typed');
				var chars = jQuery.map($elem.text().replace(/\s\s+/g, ' ').split(''), function(c) {
					return '<span>' + c + '</span>';
				});
				// Reinsert the text
				$elem.html(chars.join(''));
				// Update variable for total number of letters i text
				lettersTotal = parseInt($('.text-to-be-typed span').length);
				return lettersTotal;	
			}

			function initialMarkup () {
				// This funtion must not run before loadText
				var mark = $('.typing-window p');
				cur = mark.children(':first-child').addClass('first');
				mark.children(':last-child').addClass('last');
				return cur;
			}

			function startGame(){
					$('#start-button')
						.css({"display": "none"});
					$('#restart-button')
						.addClass('show-reset'); // Animate the restart button
					cur.addClass('current-letter');
					startTimer();
					keyBoard();
					setTimeout(updateWpm, 1010); // Wait to prevent divison by 0
					updateProgress();

					return
			}

			function resetGame() {
					stopTimer();
					$(document).off(); // Stop recieving keyboard input
					clearTimeout(wpmTimer);
					clearTimeout(progressTimer);
					// Handle CSS
					$( '.results-window' )
						.removeClass('show-results');
					$('.text-to-be-typed span')
						.removeClass('fail ok');
					cur.removeClass( 'current-letter' );
					cur = $('.first')
						.addClass( 'current-letter' );
					// Reset variables
					typed = 0;
					errors = 0;
					all = 0;
					quarter = 10;
					timePoints = [];
					wpmPoints = [];
					accuCount.text("100.0");
					// Go again
					startTimer();
					keyBoard();
					setTimeout(updateWpm, 1010); // Wait to prevent divison by 0
					updateProgress();
					return
			}

			function levelComplete() {
				$(document).off();
				clearInterval ( timer );
				clearTimeout(wpmTimer);
				quarter = 10;
				displayResults();
				timePoints = [];
				wpmPoints = [];
				updateAccu();
				return
			}

			function startTimer() {
				var min = 0,
					sec = 0;
				timer = setInterval(function () {
					++sec;
					++all;
					min = sec == 60 ? ++min : min;
					sec = sec == 60 ? 0 : sec;
					sec = sec < 10 ? "0" + sec : sec;
					clockElement.text( "0" + min + ":" + sec );
				}, 1000);
				return ;
			}

			function stopTimer() {
				clearInterval ( timer );
				return clockElement.text( "00:00" );
			}

			function keyBoard() {

				// Typing function
				$(document).keypress(function(type) {
					type.preventDefault();
					if ( type.which == cur.text().charCodeAt(0) ) {
						cur.addClass('ok');
					} else{
						cur.addClass('fail');
						++errors;
						if ( soundOn == true ) {
							failAudio.play();
						}
					}
					// Update
					++typed;
					cur.removeClass('current-letter');
					if ( typed != lettersTotal ) {	
						cur = cur.next().addClass('current-letter');
					} else {
						levelComplete();
					}
					return
				});

				// Delete funtion
				$(document).keydown(function(goback) {
					if ( goback.which == 8 ) {
						goback.preventDefault();
						if ( !cur.hasClass('first') && !cur.hasClass('last') ) {
							cur.removeClass('current-letter fail ok');
							//Update
							cur = cur.prev();
							cur.addClass('current-letter');
							cur.removeClass('fail ok');
							--typed;
						};
					} else if( goback.which == 32 ) {
						updateAccu();
					}
				});
			};

			function updateWpm() {
				var calcWpm = (((typed/5)/all)*60).toFixed(0);
				wpmCount.text(calcWpm);
				if ( calcPro >= quarter && quarter < 100.0 ){
					// Plot data
					wpmPoints.push(calcWpm);
					timePoints.push(all);
					quarter = quarter + 9.5;
				}
				wpmTimer = setTimeout(updateWpm, 800);
				return
			}

			function updateAccu() {
				var calcAccu = (100 - ((errors/lettersTotal)*100)).toFixed(1)
				accuCount.text(calcAccu);
				return
			}

			function updateProgress() {
				calcPro = ((typed/lettersTotal)*100).toFixed(1);
				progressBar.css({"width": calcPro+"%"});

				//console.log(typed,errors, lettersTotal, timePoints, wpmPoints, calcPro, quarter ); // !!!!!!!!!!!!!!!!!!!!!!! C O N S O L E   L O G

				progressTimer = setTimeout(updateProgress, 200);
				return
			}

			function displayResults() {
				$( '.results-window' ).addClass('show-results');
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
				return
			}

			// Return object exposed to the user
			return {
				initGame: function() {
					loadText();
					initialMarkup();
					return isStarted = false;
				},

				startGame: function() {
					startGame();
					return isStarted = true;
				},

				restartGame: function (){
					resetGame();
					return
				},

				toggleSound: function (){
					if ( soundOn == false ) {
						$('.typing-window .volume-box i').removeClass('off');
						soundOn = true;		
					} else {
						$('.typing-window .volume-box i').addClass('off');
						soundOn = false
					}
					return
				}
			};
		})();

		// FIRE ON LOAD
		TypingTutor.initGame();

		// START GAME
		// - - - - - - - - - - - - - - - - - - - - - -
		$('#start-button').click(function(){
			if ( isStarted == false ) {
				TypingTutor.startGame();
				this.blur();
			}
		});

		$(document).keyup(function(e) {
			if ( e.which == 13 && isStarted == false ) {
				TypingTutor.startGame();
			}
		});
		// RESTART GAME
		// - - - - - - - - - - - - - - - - - - - - - -
		$('#restart-button').click(function() {
			if ( isStarted == true ) {
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
	});
})(jQuery);