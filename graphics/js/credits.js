$(() => {
	// JQuery selectors
	var credits = $('#creditsContainer');
	var logo = $(`#logo`);
	var toggle = false;
	
	var rollCredits = function () {
		if (toggle) {
			animationFadeInElement(logo);
			// credits.animate({top: "+=0px"}, 800, function(){});
			credits.removeAttr('style');
			toggle = false;
		}
		else {
			animationFadeOutElement(logo);
			credits.animate({top: "+=0px"}, 800, function(){});
			credits.animate({top: "-=10850px"}, 131000, "linear", function(){toggle = true});
		}
	}

	$("body").click(function (){rollCredits()});
})