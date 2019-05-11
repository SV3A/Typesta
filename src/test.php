<?php
/**
 * Typing tutor project by Svea Designs
 */
include 'header.php';
?>
<div class="full-width-container fullscreen-game">

  <div class="top-bar">
    <div class="ts-logo-top-bar offset-by-four columns four columns">
      <p class="heading">Typesta.com</p>
      <img src="img/logo-black.svg" alt="Typesta typing website black logo" width="25px" height="25px" />
    </div>
    <div class="user four columns">
      <a href="#" class="user-buttons log-in-button">
        <p>LOG IN</p>
      </a>
      <a href="#" class="user-buttons stats-button">
        <p>STATS</p>
      </a>
    </div>
  </div>

  <div class="game-main-window allow-percent hidden">

    <div class="typing-window">
      <div class="meter">
        <span class="progressbar"></span>
      </div>


      <div class="volume-box">
        <a id="sound-button" href="javascript:void(0)">
          <i class="fa fa-volume-up"></i>
        </a>
        <a id="menu-button" href="javascript:void(0)">
          <i class="fa fa-cog"></i>
        </a>
      </div>

      <h1>Typing test <i class="fa fa-bolt"></i></h1>
      <a id="restart-button" class="button-reset hidden-reset" href="javascript:void(0)"><i class="fa fa-repeat"></i></a>
      <div class="hud">
        <div class="hud-item"><p>OPM: <span class="wpm">0</span></p></div>
        <div class="hud-item"><p>% : <span class="accu">100.0</span></p></div>
      </div>

      <div class="text-container">
      <p class="text-to-be-typed">Neutrinoer fra fjerne galakser har tilbagelagt millioner af lysår for til sidst at fare gennem Jorden og give sig til kende dybt nede i isen på Sydpolen.<?php
//Neutrinoer fra fjerne galakser har tilbagelagt millioner af lysår for til sidst at fare gennem Jorden og give sig til kende dybt nede i isen på Sydpolen.
//$files = array('texts/file1.php', 'texts/file2.php', 'texts/file3.php', 'texts/file4.php', 'texts/file5.php');
//include $files[rand(0, count($files)-1)];?></p>
      </div>

      <div class="clock">
        <p><i class="fa fa-clock-o"></i> <span>00:00</span></p>
      </div>

      <!--<a id="start-button" class="button button-primary controls" href="javascript:void(0)">START</i></a>-->

    </div>
<!--<p class="tip"><small><strong>Tip:</strong> Tryk enter for at starte ⏎</small></p>-->

    <div class="keyboard-area">
      <div id="left-hand" class="hands hidden">
        <div id="left-finger-idx" class="finger-heighlight"></div>
      </div>

      <div id="right-hand" class="hands hidden">
        <div id="right-finger-idx" class="finger-heighlight"></div>
      </div>

      <div id="keyboard-wrapper" class="">
      </div>
    </div>

  </div>

  <div class="problem-link">
    <p>
      <a href="#">Report a problem <i class="fa fa-exclamation-triangle"></i></a>
    </p>
  </div>

</div>

<div class="results-window hidden">
  <div id="close-result-window">
    <span>x</span>
  </div>
  <div class="container">
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

<?php
  include 'footer.php';
?>
