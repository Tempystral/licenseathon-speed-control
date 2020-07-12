'use strict';
$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	// JQuery selectors
	var gameTitle = $('#gameTitle');
	var gameCategory = $('#gameCategory');
	var gameSystem = $('#gameSystem'); 
	var gameEstimate = $('#gameEstimate');
	//var player = $('#player');
	//var twitch = $('#twitch'); -- Moved to player-info.js
	
	// This is where the information is received for the run we want to display.
	// The "change" event is triggered when the current run is changed.
	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	runDataActiveRun.on('change', (newVal, oldVal) => {
		if (newVal)
			updateSceneFields(newVal);
	});
	
	// Sets information on the pages for the run.
	function updateSceneFields(runData) {
		let title = `${runData.game}`;
		let minSize = "20px";
		let maxSize = "36px";
		let fontSize = 20;
		if (gameTitle.height() > 57) {
			fontSize += Math.min((gameTitle.height() - 57) / 67 * 6, 6);
		}
		gameTitle.css('font-size', `${fontSize}px`);
		
		gameTitle.html(runData.game);

		gameCategory.html(runData.category);
		gameSystem.html(runData.system);
		gameEstimate.html(runData.estimate);
		//$("#gameCategory").fitText();//(0.25, { minFontSize: minSize, maxFontSize: maxSize });
		//$("#gameEstimate").fitText(0.25, { minFontSize: minSize, maxFontSize: maxSize });
		gameTitle.fitText();
		gameCategory.fitText(1.25);
	}
});

var flexFont = function () {
	var divs = document.getElementsByClassName("flexFont");
	for(var i = 0; i < divs.length; i++) {
			var relFontsize = divs[i].offsetWidth*0.05;
			divs[i].style.fontSize = relFontsize+'px';
	}
};