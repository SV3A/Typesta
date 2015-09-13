<?php
/**
* Typing tutor project by Svea Designs
*/
?>
<!DOCTYPE html>
<html lang="da">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Svea Typing tutor!</title>
		<link rel="icon" type="image/png" href="favicon.png" />
		<link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="css/normalize.css" />
		<link rel="stylesheet" type="text/css" href="css/skeleton.css" />
		<link rel="stylesheet" type="text/css" href="css/svea.css" />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
		<link href='https://fonts.googleapis.com/css?family=Russo+One' rel='stylesheet' type='text/css'>
	</head>
	<body>
		<div class="gooplus">
			<g:plusone></g:plusone>
			<!--
			<a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a>
			<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button"></div>
			-->
		</div>
		<div class="container">
			<h1 style="text-align:center;padding-top:25px;letter-spacing:-2px;"><strong>Skriv <span class="green">!</span></strong></h1>
		</div>
		<div class="game-main-window">
		    <div class="container gw">
		    	<div class="row">
		        	<div class="two-half column">
						<div class="hud">
							<div class="meter">
	 							<span class="progressbar"></span>
							</div>
							<div class="hud-item"><p>OPM: <span class="wpm">0</span></p></div>
							<div class="hud-item"><p>% : <span class="accu">100</span></p></div>
						</div>
		        		<div class="typing-window">
				        	<p class="text-to-be-typed"><?php
				        		$files = array('texts/file1.php', 'texts/file2.php', 'texts/file3.php', 'texts/file4.php'); 
								include $files[rand(0, count($files)-1)];?></p>
				        	<div class="clock">
					        	<div class="volume-box">
						        	<a id="sound-button" href="javascript:void(0)">
						        		<i class="fa fa-volume-up off"></i>
						        	</a>
					        	</div>
				        		<p>00:00</p>
				        	</div>
			        	</div>
		        		<a id="start-game" class="button button-primary controls" href="javascript:void(0)">BEGYND <i class="fa fa-play-circle"></i></a>
		        		<a id="stop-game" class="button controls" href="javascript:void(0)">GENSTART <i class="fa fa-repeat"></i></a>
		        		<p><small><strong>Tip:</strong> Tryk enter for at starte ⏎</small></p>
		        	</div>
		    	</div>
			</div>
		</div>
		<div class="footer"></div>
		<div class="footer-text"><p><a class="svea-link" href="http://svea-designs.dk">A piece by Svea Designs</a></p></div>

		<div id="fb-root"></div>
		<!--
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/da_DK/sdk.js#xfbml=1&version=v2.4&appId=429398557234702";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

-->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script type="text/javascript" src="js/svea.js"></script>
		<script src="https://apis.google.com/js/platform.js" async defer></script>
		<!--
		<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
		-->
	</body>
</html>