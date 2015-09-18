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
		<title>Typesta | Learn and imporve your touch typing skills.</title>
		<link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="css/normalize.css" />
		<link rel="stylesheet" type="text/css" href="css/skeleton.css" />
		<link rel="stylesheet" type="text/css" href="js/chartist/chartist.min.css" />
		<link rel="stylesheet" type="text/css" href="css/svea.css" />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
		<link href='https://fonts.googleapis.com/css?family=Russo+One' rel='stylesheet' type='text/css'>
		<link rel="apple-touch-icon" sizes="57x57" href="apple-touch-icon-57x57.png">
		<link rel="apple-touch-icon" sizes="60x60" href="apple-touch-icon-60x60.png">
		<link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-72x72.png">
		<link rel="apple-touch-icon" sizes="76x76" href="apple-touch-icon-76x76.png">
		<link rel="apple-touch-icon" sizes="114x114" href="apple-touch-icon-114x114.png">
		<link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-120x120.png">
		<link rel="apple-touch-icon" sizes="144x144" href="apple-touch-icon-144x144.png">
		<link rel="apple-touch-icon" sizes="152x152" href="apple-touch-icon-152x152.png">
		<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon-180x180.png">
		<link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32">
		<link rel="icon" type="image/png" href="favicon-194x194.png" sizes="194x194">
		<link rel="icon" type="image/png" href="favicon-96x96.png" sizes="96x96">
		<link rel="icon" type="image/png" href="android-chrome-192x192.png" sizes="192x192">
		<link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16">
		<link rel="manifest" href="manifest.json">
		<meta name="msapplication-TileColor" content="#00aba9">
		<meta name="msapplication-TileImage" content="mstile-144x144.png">
		<meta name="theme-color" content="#33f099">
	</head>
	<body id="top" class="frontpage">
		<div class="dim"></div>
		    <div id="nav-buttons"><span class="ham"><i class="fa fa-bars"></i></span><span class="close-menu close-menu-hidden"><i class="fa fa-arrow-circle-left"></i></span></div>
	    <nav>
	      <ul class="menu">
	        <li><a href="#">Forsiden</a></li>
	        <li><a href="#">Lær</a></li>
	        <li><a href="test.php">Test</a></li>
	        <li><a href="#">Om</a></li>
	        <li><a href="#">FAQ</a></li>
	      </ul>
	    </nav>
		<div class="full-width-container frontpage-hero"></div>
		
		<div class="frontpage-greet">
			<h1 class="heading">Type<span class="green">sta</span>.com</h1>
			<img class="ts-logo" src="img/logo.svg" alt="Typesta typing website logo" width="30px" height="30px" />
			<p class="sub-heading">Learn, test and build your touch typing skills.</p>

			<div class="container eye-catcher">
				<div class="row">
					<h4>Up for a typing test to get us started?</h4>
					<div class="ten columns offset-by-one">
						<p>The rules are simple, type the following text as fast as possible.</p>
						<div class="typing-window tw-frontpage">
							<p class="text-to-be-typed">You know what, your imagination works faster than your mind.</p>
						</div>
					</div>
				</div>
			</div>
			<div class="social-links">
				<div class="fb-padding">
					<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button"></div>
				</div>
				<a href="https://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a>
				<g:plusone></g:plusone>
			</div>
		</div>
		<section id="welcome">
			<div class="container">
				<div class="row">
					<div class="eight columns offset-by-two">
						<h2>So, you want to type fast?</h2>
						<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. </p>
					</div>
				</div>
			</div>
		</section>
		<footer>
			<div class="footer-content">
				<p class="copyrights">
					© 2015 | <a class="svea-link"href="http://svea-designs.dk">Svea Designs.</a>
				</p>
				<p>
					Made witht the help of<br/>
					<img class="thx-to-img" src="img/thx/chartist-icon.svg" alt="Chartist.js logo" width="25px" height="25px" /> 
					<strong>&</strong> 
					<img class="thx-to-img" src="img/thx/skeleton.png" alt="Skeleton css logo" width="25px" height="25px" />
				</p>
			</div>
			<div class="more-footer-links">
				<p>
					<a href="#">About</a>
					<a href="#">Contact</a>
					<a href="#">Privacy & Terms</a>
				</p>
			</div>
		</footer>

		<div id="fb-root"></div>
		<script>(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/da_DK/sdk.js#xfbml=1&version=v2.4&appId=429398557234702";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));</script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script type="text/javascript" src="js/chartist/chartist.min.js"></script>
		<script type="text/javascript" src="js/sveastructured.js"></script>
		<script src="https://apis.google.com/js/platform.js" async defer></script>
		<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
	</body>
</html>
