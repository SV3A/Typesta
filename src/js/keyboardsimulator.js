/* jshint node: true */
'use strict';
var $ = require('jquery');

var keySimulator = (function() {

	var altKey,
		leftShiftKey,
		rightShiftKey,
		fingerToUse;

	function loadKeyboard (lang) {
		$("#keyboard-wrapper").load("keyboards/"+lang+"layout.html");
	}
	var animate = {};

	animate.fail = function (failSelector) {
		failSelector.addClass('key-guide-fail')
			.delay(700).queue(function() {
				$(this).removeClass('key-guide-fail');
				$(this).dequeue();
			});
	};

	animate.hand = function (keyToFinger){
		fingerToUse = keyToFinger.data('finger');
		if (fingerToUse <= 5) {
			$('#left-hand div').toggleClass('finger-' + fingerToUse);
		} else {
			$('#right-hand div').toggleClass('finger-' + fingerToUse);
		}
	};

	animate.slidehands = function(hands){
		$(hands).slideDown( 200 );
	};

	function resetGuide(firstChar) {
		$('.keyboard .key-row div').removeClass('key-guide-nxt');
		$('#left-hand div').removeClass('finger-' + fingerToUse);
		$('#right-hand div').removeClass('finger-' + fingerToUse);
		$('#right-hand div').removeClass('finger-10');
		$('#left-hand div').removeClass('finger-1');
		altKey = $(".keyboard .key-row div[data-key='altgr']");
		leftShiftKey = $(".keyboard div[data-key='leftshiftkey']");
		rightShiftKey = $(".keyboard .key-row div[data-key='rightshiftkey']");

		visualGuidance.next(firstChar);
	}

	var visualGuidance = {};

	visualGuidance.next = function(typedChar) {
		if ($(".keyboard .key-row div[data-key='" + typedChar + "']").length) {
			$(".keyboard .key-row div[data-key='" + typedChar + "']").toggleClass("key-guide-nxt");

			animate.hand($(".keyboard .key-row div[data-key='" + typedChar + "']"));

		} else if ($(".keyboard .key-row div[data-shift='" + typedChar + "']").length) {
			$(".keyboard .key-row div[data-shift='" + typedChar + "']").toggleClass("key-guide-nxt");

			animate.hand($(".keyboard .key-row div[data-shift='" + typedChar + "']"));

			if ($(".keyboard .key-row div[data-shift='" + typedChar + "']").data("finger") > 5) {
				leftShiftKey.toggleClass("key-guide-nxt");
				$("#left-hand div").toggleClass("finger-1");
			} else {
				rightShiftKey.toggleClass("key-guide-nxt");
				$("#right-hand div").toggleClass("finger-10");
			}

		} else {
			altKey.toggleClass("key-guide-nxt");
			$(".keyboard .key-row div[data-alt='" + typedChar + "']").toggleClass("key-guide-nxt");
			animate.hand($(".keyboard .key-row div[data-alt='" + typedChar + "']"));
		}
	};

	visualGuidance.fail = function(key) {
		if ($(".keyboard div[data-key='" + key + "']").length) {
			animate.fail($(".keyboard div[data-key='" + key + "']"));

		} else if ($(".keyboard div[data-shift='" + key + "']").length) {
			animate.fail($(".keyboard div[data-shift='" + key + "']"));

			if ($(".keyboard .key-row div[data-shift='" + key + "']").data("finger") > 5) {
				animate.fail(leftShiftKey);
			} else {
				animate.fail(rightShiftKey);
			}
		} else {
			animate.fail($(".keyboard div[data-alt='" + key + "']"));
			animate.fail(altKey);
		}
	};

	return {
		loadKeyboard:loadKeyboard,
		resetGuide:resetGuide,
		show:visualGuidance,
		showHands: animate.slidehands
	};
})();

module.exports = keySimulator;
