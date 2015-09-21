<?php
/**
* Typing tutor project by Svea Designs
*/
include 'header.php';
?>
<div id="main-content" class="container">
	<h1 class="heading">Typing <span class="green">test</span></h1>
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
<?php
	include 'footer.php';
?>