// Load the text and and nessesary html
function loadText(){
	// Add a span around each character after removing multiple spaces
	$elem = $('.text-to-be-typed');
	var chars = jQuery.map($elem.text().replace(/\s\s+/g, ' ').split(''), function(c) {
		return '<span>' + c + '</span>';
	});

	// Reinsert the text
	return $elem.html(chars.join(''));
};

// Start the timer
function startTimer(){
	var sec = 0;
	all = 0;
	var min = 0;
	timer = setInterval(function () {
		++sec;
		++all;
		min = sec == 60 ? ++min : min;
		sec = sec == 60 ? 0 : sec;
		sec = sec < 10 ? "0" + sec : sec;

		$( '.clock p' ).text( "0" + min + ":" + sec );
	}, 1000);
	return;
};


function updateHud(){
	$('.wpm').text((((typed/5)/all)*60).toFixed(0));
	updateProgress(typed,letterstotal);
	setTimeout(updateHud, 2000);
};

// Reset timer
function stopTimer(){
	clearInterval ( timer );
	return $( '.clock p' ).text( "00:00" );
};

// Update progressbar as user types
function updateProgress(typed,letterstotal){
	return $( '.meter span' ).css({"width": ((typed/letterstotal)*100).toFixed(1)+"%"});
};

// Main function
function startGame(failaudio) {
	
	// Initialize cursor
	$('.typing-window p').children(':first-child').addClass('current-letter first');
	$('.typing-window p').children(':last-child').addClass('last');

	letterstotal = $('.text-to-be-typed span').length;

	// Start the timer
	startTimer();
	
	typed = 0;
	errors = 0;
	var cur = $('.current-letter');

	updateHud();
	
	// Delete funtion
	$(document).keydown(function(goback) {
		if (goback.which == 8 ) {
			goback.preventDefault();

			if ( !cur.hasClass('first') && !cur.hasClass('last')){
				cur.removeClass('current-letter fail ok');

				//Update
				cur = cur.prev();
				cur.addClass('current-letter');
				cur.removeClass('fail ok');
				--typed;
			};
		}
		else if(goback.which == 32){
			$('.accu').text( 100-(((errors/letterstotal)*100).toFixed(1)) );
		};
	});

	$(document).keypress(function(type) {
		if (typed!=letterstotal-1){
			if ( type.which == cur.text().charCodeAt(0) ) {
				cur.addClass('ok');
			}
			else{
				cur.addClass('fail');
				++errors;
				if (soundOn == true){
					failaudio.play();
				};
			};

			// Update
			cur.removeClass('current-letter');
			cur = cur.next().addClass('current-letter');
			++typed;
		}
		else{
			clearInterval ( timer );
			$('.accu').text( 100-(((errors/letterstotal)*100).toFixed(1)) );
		};
	});


	// Stop the game
	$('#stop-game').click(function(){
		stopTimer();
		startTimer();
		$('.text-to-be-typed span').removeClass('fail ok');
		cur.removeClass( 'current-letter' );
		cur = $('.first');
		cur.addClass( 'current-letter' );

		typed = 0;
		errors = 0;
		$('.accu').text("100");
		//isStarted = false;
	});
};

$(document).ready(function() {
	var failaudio = new Audio('pew.mp3');
	isStarted = false;
	loadText();
	soundOn = false;
	
	$('#start-game').click(function(){
		if (isStarted == false) {
			startGame(failaudio);
			isStarted = true;
		};
	});

	$(document).keyup(function(e) {
		if (e.which == 13 && isStarted == false) {
			startGame(failaudio);
			isStarted = true;
		};
	});

	$('#sound-button').click(function(){
		if (soundOn == false){
			soundOn = true;
			$('.volume-box i').removeClass('off');
		}
		else {
			soundOn = false;
			$('.volume-box i').addClass('off');
		};
	});
});
