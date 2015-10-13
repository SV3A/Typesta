<?php
/**
* Typing tutor project by Svea Designs
*/
include 'header.php';
?>

<div id="hero">

	<div id="hero-background" class="full-width-container"></div>
	
	<div id="hero-content">

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
			Made with the help of<br/>
			<img class="thx-to-img" src="img/thx/chartist-icon.svg" alt="Chartist.js logo" width="25px" height="25px" /> 
			<strong>&</strong> 
			<img class="thx-to-img" src="img/thx/skeleton.png" alt="Skeleton css logo" width="25px" height="25px" />
		</p>
	</div>
	<div class="more-footer-links">
		<p>
			<a href="#">About</a>
			<a href="#">Contact</a>
			<a href="#">Report problem</a>
			<a href="#">Privacy & Terms</a>
		</p>
	</div>
</footer>
<div id="fb-root"></div>
	<script>
		(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/da_DK/sdk.js#xfbml=1&version=v2.4&appId=429398557234702";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	</script>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
<?php
	include 'footer.php';
?>