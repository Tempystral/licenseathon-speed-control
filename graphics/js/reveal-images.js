'use strict';

$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	let displayNameForOriginal = 45000; // 45 seconds
	let displayTwitchForOriginal = 10000; // 10 seconds
	let runnerCount = 0;
	let rotationTO;
	let runDataActiveRunCache = {};
	let runnerData = [];

	// This is where the information is received for the run we want to display.
	// The "change" event is triggered when the current run is changed.
	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	runDataActiveRun.on('change', (newVal, oldVal) => {
		if (newVal) {
			if (JSON.stringify(newVal) !== JSON.stringify(runDataActiveRunCache)) {
				clearTimeout(rotationTO);

				updateSceneFields(newVal);
				runDataActiveRunCache = newVal;
			}
		}
	});
	
	// Sets information on the pages for the run.
	function updateSceneFields(runData) {
		for (let i = 0; i <= runnerCount; i++) {

			animationFadeOutElement($(`#gameImage`));
		}
		showGameImage(runData.game);
		
	}

	function showGameImage(game) {
		const imgName = `img/games/${game}.png`.toLowerCase();
		//animationSetField($(`#gameImage`),`<img src="${imgName}"/>`);
		$(`#gameImage`).html(`<img src="${imgName}"/>`)
	}
});