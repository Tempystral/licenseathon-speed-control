$(() => {
	// JQuery selectors
	var credits = $('#creditsContainer');
	var logo = $(`#logo`);
	var toggle = false;
	
	var rollCredits = function () {
		// if (toggle) {
		// 	animationFadeInElement(logo);
		// 	// credits.animate({top: "+=0px"}, 800, function(){});
		// 	credits.removeAttr('style');
		// 	toggle = false;
		// }
		// else {
		// 	animationFadeOutElement(logo);
		// 	credits.animate({top: "+=0px"}, 800, function(){});
		// 	credits.animate({top: "-=10850px"}, 131000, "linear", function(){toggle = true});
		// }

		var options = { time_factor: 1 };
        if( ((navigator ||{}).userAgent || '').match(/PhantomJS/) ) {
            options.time_factor = 2;
        }

        var fadeSpeed = 500;

        $('#titles').titleSequence([

            { // Fade out logo
                selector: '#logo',
                animate: { opacity: 0 },
                duration: 1200,
                pause: 500
            },

            {
                content: $("#organizers").html(),
                id: 'organizers',
                class: "creditsContainer",
                css: { opacity: 0 },
                animate: { opacity: 1 },
                duration: fadeSpeed,
                pause: 5000,
                easing: 'linear'
            },
            {
                selector: "#organizers",
                animate: { opacity: 0 },
                duration: fadeSpeed,
                easing: 'linear'
            },
            { delete: '#organizers', },

            {
                content: $("#restreamers").html(),
                id: 'restreamers',
                class: "creditsContainer",
                css: { opacity: 0 },
                animate: { opacity: 1 },
                duration: fadeSpeed,
                pause: 5000,
                easing: 'linear'
            },
            {
                selector: "#restreamers",
                animate: { opacity: 0 },
                duration: fadeSpeed,
                easing: 'linear'
            },
            { delete: '#restreamers', },

            {
                content: $("#moderators").html(),
                id: 'moderators',
                class: "creditsContainer",
                css: { opacity: 0 },
                animate: { opacity: 1 },
                duration: fadeSpeed,
                pause: 5000,
                easing: 'linear'
            },
            {
                selector: "#moderators",
                animate: { opacity: 0 },
                duration: fadeSpeed,
                easing: 'linear'
            },
            { delete: '#moderators', },

            {
                content: $("#scheduling").html(),
                id: 'scheduling',
                class: "creditsContainer",
                css: { opacity: 0 },
                animate: { opacity: 1 },
                duration: fadeSpeed,
                pause: 5000,
                easing: 'linear'
            },
            {
                selector: "#scheduling",
                animate: { opacity: 0 },
                duration: fadeSpeed,
                easing: 'linear'
            },
            { delete: '#scheduling', },

            {
                content: $("#prep").html(),
                id: 'prep',
                class: "creditsContainer",
                css: { opacity: 0 },
                animate: { opacity: 1 },
                duration: fadeSpeed,
                pause: 5000,
                easing: 'linear'
            },
            {
                selector: "#prep",
                animate: { opacity: 0 },
                duration: fadeSpeed,
                easing: 'linear'
            },
            { delete: '#prep', },

            {
                content: $("#socialmedia").html(),
                id: 'socialmedia',
                class: "creditsContainer",
                css: { opacity: 0 },
                animate: { opacity: 1 },
                duration: fadeSpeed,
                pause: 5000,
                easing: 'linear'
            },
            {
                selector: "#socialmedia",
                animate: { opacity: 0 },
                duration: fadeSpeed,
                easing: 'linear'
            },
            { delete: '#socialmedia', },

            {
                content: $("#runners").html(),
                id: 'runners',
                class: "creditsContainer",
                css: { top: '100%' },
                animate: { top: '-5500px' },
                duration: 35000,
                easing: 'linear'
            },

            {
                content: $("#finaltext").html(),
                id: 'finaltext',
                class: "creditsContainer",
                css: { opacity: 0 },
                animate: { opacity: 1 },
                duration: fadeSpeed,
                pause: 5000,
                easing: 'linear'
            },

            function() {
                if(console && console.log) {
                    console.log('done');
                }
            }

        ], options);


	}

	$("body").click(function (){rollCredits()});
})