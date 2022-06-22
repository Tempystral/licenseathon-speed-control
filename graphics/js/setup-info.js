'use strict';
$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	// JQuery selectors
	var gameTitle = $('#gameTitle');
	var gameCategory = $('#gameCategory');
	var gameSystem = $('#gameSystem'); 
	var gameEstimate = $('#gameEstimate');
	var playerNames = $('.playerText'); // Array
	var gameImage = $(`#gameImage`);
	
	// This is where the information is received for the run we want to display.
	// The "change" event is triggered when the current run is changed.
	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	runDataActiveRun.on('change', (newVal, oldVal) => {
		if (newVal)
			updateSceneFields(newVal);
	});
	
	// Sets information on the pages for the run.
	function updateSceneFields(runData) {
		// gameTitle.html(runData.game);
		// gameCategory.html(runData.category);
		// gameSystem.html(runData.system);
		// gameEstimate.html(runData.estimate);

		animationSetField(gameTitle, runData.game);
		animationSetField(gameCategory, runData.category || "<p></p>");
		animationSetField(gameSystem, runData.system);
		animationSetField(gameEstimate, runData.estimate);

		let runnerData = setRunnerNames(runData);
		let runnerStr = "";
		if (runnerData.length == 2){
			runnerStr = runnerData.slice(0,-1).join(", ") + " & " + runnerData[runnerData.length-1];
		}
		else if (runnerData.length > 2){
			runnerStr = runnerData.slice(0,-1).join(", ") + ", & " + runnerData[runnerData.length-1];
		}
		else { runnerStr = runnerData[0]; }
		animationSetField(playerNames, runnerStr);

		const imgName = `img/games/${runData.game}.png`.toLowerCase().replace(":","");
		if (gameImage) {
			animationSetField(gameImage, `<img src="${imgName}"/>`)
		}
		
	}
});

function setRunnerNames(runData){
	if (runData.teams.length == 0) {
		return ["<p></p>"];
	}
	let runnerCount = runData.teams.length;
	let runnerData = [];
	for (let i = 0; i < runData.teams.length; i++) {
		const team = runData.teams[i];
		const player = team.players[0];
		
		runnerData[i] = player.name; //{ name: player.name, twitch: player.social.twitch };
	}
	return runnerData;
}

var flexFont = function () {
	var divs = document.getElementsByClassName("flexFont");
	for(var i = 0; i < divs.length; i++) {
			var relFontsize = divs[i].offsetWidth*0.05;
			divs[i].style.fontSize = relFontsize+'px';
	}
};