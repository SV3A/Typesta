function startTimer(){
	var sec = 0;
	var min = 0;
	timer = setInterval(function () {
		++sec;
		min = sec == 60 ? ++min : min;

		sec = sec == 60 ? 0 : sec;
		sec = sec < 10 ? "0" + sec : sec;

		$( '.clock p' ).text( "0" + min + ":" + sec );			
	}, 1000);
};
function stopTimer(){
	clearInterval ( timer );
	$( '.clock p' ).text( "00:00" );
};
function startGame() {
	var isStarted = false;

	$('.start-game').click(function(){
		if (isStarted == false) {
			startTimer();
			isStarted = true;
		};
	});

	$('.stop-game').click(function(){
		stopTimer();
		isStarted = false;
	});
	
	$(document).keydown(function(e) {
		if (e.which == 13 && isStarted == false) {
			startTimer();
		};
	});
};

	// to stop the counter
	//clearInterval(myInterval);


$(document).ready(function() {
	startGame();
});
