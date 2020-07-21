'use strict';

$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	let displayNameForOriginal = 45000; // 45 seconds
	let displayTwitchForOriginal = 15000; // 15 seconds
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
			const playerCont = $(`.playerContainer[player-id="${i + 1}"]`);

			if (!playerCont.length || !runnerData[i]) break;

			//const twitchLogo = $(`.twitchLogo`, playerCont);
			//const nameLogo = $(`.nameLogo`, playerCont);

			//animationFadeOutElement($(`#runnerImage`));
		}

		runnerCount = runData.teams.length;
		runnerData = [];
		for (let i = 0; i < runData.teams.length; i++) {
			const team = runData.teams[i];
			const player = team.players[0];

			runnerData[i] = { name: player.name, twitch: player.social.twitch };
		}

		showImages(0);
	}

	// Change to showing usernames.
	function showImages(runnerID) {
		console.log(runnerData);
		let imgName = `img/runners/${runnerData[runnerID].twitch}.png`;
		console.log(imgName);

		$(`#runnerImage`).css("background-image", `url("${imgName}")`);//animationSetField($(`#runnerImage`), "<img><img>");
		//animationFadeOutInElements(twitchLogo, nameLogo);
		let nextRunnerID = (runnerID + 1) % runnerCount;
		rotationTO = setTimeout(function(){showImages(nextRunnerID);}, displayTwitchForOriginal);
	}
	
	function getRunnerData(runData){
		let runnerCount = runData.teams.length;
		let runnerData = [];
		for (let i = 0; i < runData.teams.length; i++) {
			const team = runData.teams[i];
			const player = team.players[0];
			
			runnerData[i] = player.social.twitch; //{ name: player.name, twitch: player.social.twitch };
		}
		return runnerData;
	}

	// Change to showing Twitch names.
	function showImages2(runnerID) {
		let imgName = `img/runners/${runnerData[runnerID].twitch}.png`;

		$(`#runnerImage`).css("background-image", `url("${imgName}")`);//animationSetField($(`#runnerImage`), "<img><img>");
		//animationFadeOutInElements(twitchLogo, nameLogo);
		let nextRunnerID = (runnerID + 1) % runnerCount;
		rotationTO = setTimeout(function(){showImages(nextRunnerID);}, displayNameForOriginal);
	}
});