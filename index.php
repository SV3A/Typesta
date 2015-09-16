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
		<link rel="stylesheet" type="text/css" href="js/chartist/chartist.min.css" />
		<link rel="stylesheet" type="text/css" href="css/svea.css" />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
		<link href='https://fonts.googleapis.com/css?family=Russo+One' rel='stylesheet' type='text/css'>
		



		
	</head>
	<body id="top">
	<div class="dim"></div>
	    <div id="nav-buttons"><span class="ham"><i class="fa fa-bars"></i></span><span class="close-menu close-menu-hidden"><i class="fa fa-arrow-circle-left"></i></span></div>
    <nav>
      <ul class="menu">
        <li><a href="#">Forsiden</a></li>
        <li><a href="#">Lær</a></li>
        <li><a href="#">Test</a></li>
        <li><a href="#">Om</a></li>
        <li><a href="#">FAQ</a></li>
      </ul>
    </nav>
<!--
		<div class="gooplus">
			<g:plusone></g:plusone>
			
			<a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a>
			<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button"></div>
			
		</div>
		-->
		<div id="main-content" class="container">
			<h1 class="heading"><strong>Skriv <span class="green">!</span></strong></h1>
		</div>
		<div class="game-main-window allow-percent">
			<div class="container allow-percent">
				<div class="row allow-percent">
				<div class="two-half column allow-percent">
						<div class="hud">
							<div class="meter">
								<span class="progressbar"></span>
							</div>
							<div class="hud-item"><p>OPM: <span class="wpm">0</span></p></div>
							<div class="hud-item"><p>% : <span class="accu">100.0</span></p></div>
						</div>
						<div class="typing-window">
							<p class="text-to-be-typed">Neutrinoer fra fjerne galakser har tilbagelagt millioner af lysår for til sidst at fare gennem Jorden og give sig til kende dybt nede i isen på Sydpolen.<?php
							//Neutrinoer fra fjerne galakser har tilbagelagt millioner af lysår for til sidst at fare gennem Jorden og give sig til kende dybt nede i isen på Sydpolen.
								//$files = array('texts/file1.php', 'texts/file2.php', 'texts/file3.php', 'texts/file4.php', 'texts/file5.php');
								//include $files[rand(0, count($files)-1)];?></p>
							<div class="clock">
								<div class="volume-box">
									<a id="sound-button" href="javascript:void(0)">
										<i class="fa fa-volume-up off"></i>
									</a>
								</div>
								<p>00:00</p>
							</div>
						</div>
						<a id="start-button" class="button button-primary controls" href="javascript:void(0)">BEGYND <i class="fa fa-play-circle"></i></a>
						<a id="restart-button" class="button controls hidden-reset" href="javascript:void(0)">GENSTART <i class="fa fa-repeat"></i></a>
						<p class="tip"><small><strong>Tip:</strong> Tryk enter for at starte ⏎</small></p>
						<div class="results-window hidden-results">

							<div class="text-center">
								<h2>Resultater</h2>
								<hr />
								<div class="stars">
									<p></p>
								</div>
								<div class="motivation-message">
									<p></p>
								</div>
								<div class="accuracy">
									<div class="title-accu"><p>NØJAGTIGHED:</p></div>
									<div class="accu-two"><p><span class="result"></span> %</p></div>
								</div>
							</div>
							<div class="text-center">
								<div class="title-wpm"><p>ORD PR. MINUT:</p></div>
								<div class="wpm-max"><p>Max: <span class="result"></span></p></div>
								<div class="wpm-avg"><p>Gennemsnit: <span class="result"></span></p></div>
							</div>
							<div id="results-chart" class="grap-window ct-chart">
							<p class="y-axis"><small>OPM.</small></p>
							</div>
							<p class="text-center x-axis"><small>SEKUNDER</small></p>
						</div>
					</div>
				</div>

			</div>
		</div>


	<!--

		<div class="footer-text"><p><a class="svea-link" href="http://svea-designs.dk">A piece by Svea Designs</a></p></div>
	
		<div class="footer"></div>
		<div class="footer-text"><p><a class="svea-link" href="http://svea-designs.dk">A piece by Svea Designs</a></p></div>

		<div id="fb-root"></div>

<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/da_DK/sdk.js#xfbml=1&version=v2.4&appId=429398557234702";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

-->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script type="text/javascript" src="js/chartist/chartist.min.js"></script>
		<script type="text/javascript" src="js/sveastructured.js"></script>
		<script src="https://apis.google.com/js/platform.js" async defer></script>
		<!--
		<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
		-->
	</body>
</html>
