'use strict';
$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	// JQuery selectors.							// Contained in...
	var player1 = $('#player1'); // allGraphics.html
	var player1Window = document.getElementById("player1Window");
	var twitch = $('#twitch');

	// Runner Twitch URLs
	var player1_twitch = "";
	
	// This is where the information is received for the run we want to display.
	// The "change" event is triggered when the current run is changed.
	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	runDataActiveRun.on('change', (newVal, oldVal) => {
		if (newVal)
			updateSceneFields(newVal);
	});
	
	// Sets information on the pages for the run.
	function updateSceneFields(runData) {
		
		// Check if the #player/#twitch span exists
		if (player.length || twitch.length) {
			// Open the webpage with a hash parameter on the end to choose the team.
			// eg: http://localhost:9090/bundles/speedcontrol-simpletext/graphics/player.html#2
			// If this can't be found, defaults to 1.
			var playerNumber = parseInt(window.location.hash.replace('#', '')) || 1;
			
			// Arrays start from 0 and not 1, so have to adjust for that.
			var team = runData.teams[playerNumber-1];

			//player.html(team.players[0].name); // player.html
			player1_twitch = "".concat("https://www.twitch.tv/", team.players[0].social.twitch);
			// update twitch url
			player1Window.src.replace(player1_twitch); // causes a loop for some reason
		}
	}
});