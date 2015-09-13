(function($) {
	$(document).ready(function() {

		var TypingTutor = (function () {

			// privates
			var all = 0,
				cur = $(),
				typed = 0,
				errors = 0,
				calcAccu = 100,
				soundOn = false,
				lettersTotal = 0,
				wpmCount = $( '.hud .hud-item .wpm' ),
				accuCount = $('.hud .hud-item .accu'),
				progressBar = $( '.meter span' ),
				clockElement = $( '.typing-window .clock p' ),
				failaudio = new Audio('pew.mp3');

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
				
				cur = mark.children(':first-child');
				mark.children(':last-child').addClass('last');

				return cur;
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

			function resetGame() {
					$('.text-to-be-typed span').removeClass('fail ok');
					cur.removeClass( 'current-letter' );
					cur = $('.first');
					cur.addClass( 'current-letter' );
					typed = 0;
					errors = 0;
					accuCount.text("100");
					return typed, errors;
			}

			function keyBoard() {

				// Typing function
				$(document).keypress(function(type) {
					if ( typed!=lettersTotal-1 ) {
						if ( type.which == cur.text().charCodeAt(0) ) {
							cur.addClass('ok');
						} else{
							cur.addClass('fail');
							++errors;
							if ( soundOn == true ) {
								failaudio.play();
							}
						}

						// Update
						cur.removeClass('current-letter');
						cur = cur.next().addClass('current-letter');
						++typed;

					} else {
						clearInterval ( timer );
						updateAccu();
					}
					return;
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

			function updateHud() {
				wpmCount.text((((typed/5)/all)*60).toFixed(0));
				setTimeout(updateHud, 2000);
				return;
			}

			function updateAccu() {
				calcAccu = (100 - ((errors/lettersTotal)*100)).toFixed(1)
				accuCount.text(calcAccu);

				return;
			}

			function updateProgress() {
				progressBar.css({"width": ((typed/lettersTotal)*100).toFixed(1)+"%"});
				setTimeout(updateProgress, 300);
				return;
			}

			// Return object exposed to the user
			return {

				initGame: function (){
					loadText();
					initialMarkup();
					return isStarted = false;
				},

				startGame: function () {
					cur.addClass('current-letter first');
					startTimer();
					keyBoard();
					setTimeout(updateHud, 2000);
					updateProgress();
					return isStarted = true;
				},

				restartGame: function (){
					stopTimer();
					startTimer();
					resetGame();
				},

				toggleSound: function (){
					if ( soundOn == false ) {
						$('.typing-window .volume-box i').removeClass('off');
						soundOn = true;		
					} else {
						$('.typing-window .volume-box i').addClass('off');
						soundOn = false
					}
				}
			};

		})();

		// ALL READY FIRED!
		TypingTutor.initGame();

		// S T A R T  T H E  G A M E
		// - - - - - - - - - - - - - - - - - - - - - -
		$('#start-game').click(function(){
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
		// - - - - - - - - - - - - - - - - - - - - - -

		// Control the sound
		// - - - - - - - - - - - - - - - - - - - - - -
		$('#sound-button').click(function() {
			TypingTutor.toggleSound();
			this.blur();
		});

		$('#stop-game').click(function() {
			TypingTutor.restartGame();
			this.blur();
		});
		// - - - - - - - - - - - - - - - - - - - - - -

	});
})(jQuery);