var $ = require('jquery');

var keySimulator = (function() {
	function loadKeyboard (lang) {
		$("#keyboard-wrapper").load("keyboards/"+lang+"layout.html");
	}
	var keyBoardGuidance = {
		failAnimation: function(failSelector) {
			failSelector.addClass("key-guide-fail")
				.delay(700).queue(function() {
					$(this).removeClass("key-guide-fail");
					$(this).dequeue();
				});
		},
		handAnimation: function(keyToFinger){
			fingerToUse = keyToFinger.data("finger");
			if (fingerToUse <= 5) {
				$("#left-hand div").toggleClass("finger-" + fingerToUse);
			} else {
				$("#right-hand div").toggleClass("finger-" + fingerToUse);
			}
		},
		resetGuide: function() {
			$(".keyboard .top-row div").removeClass("key-guide-nxt");
			$("#left-hand div").removeClass("finger-" + fingerToUse);
			$("#right-hand div").removeClass("finger-" + fingerToUse);
			$("#right-hand div").removeClass("finger-10");
			$("#left-hand div").removeClass("finger-1");
			altKey = $(".keyboard .top-row div[data-key='altgr']");
			leftShiftKey = $(".keyboard div[data-key='leftshiftkey']");
			rightShiftKey = $(".keyboard .top-row div[data-key='rightshiftkey']");
		},
		getNext: function() {
			if ($(".keyboard .top-row div[data-key='" + charCodes[typed] + "']").length) {
				$(".keyboard .top-row div[data-key='" + charCodes[typed] + "']").toggleClass("key-guide-nxt");

				keyBoardGuidance.handAnimation($(".keyboard .top-row div[data-key='" + charCodes[typed] + "']"));

			} else if ($(".keyboard .top-row div[data-shift='" + charCodes[typed] + "']").length) {
				$(".keyboard .top-row div[data-shift='" + charCodes[typed] + "']").toggleClass("key-guide-nxt");

				keyBoardGuidance.handAnimation($(".keyboard .top-row div[data-shift='" + charCodes[typed] + "']"));

				if ($(".keyboard .top-row div[data-shift='" + charCodes[typed] + "']").data("finger") > 5) {
					leftShiftKey.toggleClass("key-guide-nxt");
					$("#left-hand div").toggleClass("finger-1");
				} else {
					rightShiftKey.toggleClass("key-guide-nxt");
					$("#right-hand div").toggleClass("finger-10");
				}
			} else {
				altKey.toggleClass("key-guide-nxt");
				$(".keyboard .top-row div[data-alt='" + charCodes[typed] + "']").toggleClass("key-guide-nxt");
				keyBoardGuidance.handAnimation($(".keyboard .top-row div[data-alt='" + charCodes[typed] + "']"));
			}
		},
		showFail: function(key) {
			if ($(".keyboard div[data-key='" + key + "']").length) {
				keyBoardGuidance.failAnimation($(".keyboard div[data-key='" + key + "']"));
			} else if ($(".keyboard div[data-shift='" + key + "']").length) {
				keyBoardGuidance.failAnimation($(".keyboard div[data-shift='" + key + "']"));

				if ($(".keyboard .top-row div[data-shift='" + key + "']").data("finger") > 5) {
					keyBoardGuidance.failAnimation(leftShiftKey);
				} else {
					keyBoardGuidance.failAnimation(rightShiftKey);
				}
			} else {
				keyBoardGuidance.failAnimation($(".keyboard div[data-alt='" + key + "']"));
				keyBoardGuidance.failAnimation(altKey);
			}
		}
	};
	return {
		loadKeyboard: loadKeyboard,
		keyBoardGuidance: keyBoardGuidance
	};
})();

module.exports = keySimulator;