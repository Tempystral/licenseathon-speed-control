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
	let twitchLogoStr = '<i class="fab fa-twitch"></i>'; // FontAwesome Twitch
	let playerLogoStr = '<i class="fas fa-gamepad"></i>'; // FontAwesome Gamepad

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

			animationFadeOutElement($(`.playerText`, playerCont));
			//animationFadeOutElement(twitchLogo);
			//animationFadeOutElement(nameLogo);
		}

		runnerCount = runData.teams.length;
		runnerData = [];
		for (let i = 0; i < runData.teams.length; i++) {
			const team = runData.teams[i];
			const player = team.players[0];

			runnerData[i] = { name: player.name, twitch: player.social.twitch };
		}

		showNames();
	}

	// Change to showing usernames.
	function showNames() {
		for (var i = 0; i <= runnerCount; i++) {
			const playerCont = $(`.playerContainer[player-id="${i + 1}"]`);

			if (!playerCont.length || !runnerData[i]) break;

			//const twitchLogo = $(`.twitchLogo`, playerCont);
			//const nameLogo = $(`.nameLogo`, playerCont);
			let nameStr = `${playerLogoStr} ${runnerData[i].name}`;

			animationSetField($(`.playerText`, playerCont), nameStr);
			//animationFadeOutInElements(twitchLogo, nameLogo);
		}
		
		rotationTO = setTimeout(showTwitchs, displayNameForOriginal);
	}
	
	// Change to showing Twitch names.
	function showTwitchs() {
		for (var i = 0; i <= runnerCount; i++) {
			const playerCont = $(`.playerContainer[player-id="${i + 1}"]`);

			if (!playerCont.length || !runnerData[i]) break;

			//const twitchLogo = $(`.twitchLogo`, playerCont);
			//const nameLogo = $(`.nameLogo`, playerCont);
			let twitchStr = `${twitchLogoStr} ${runnerData[i].twitch}`;

			animationSetField($(`.playerText`, playerCont), twitchStr);
			//animationFadeOutInElements(nameLogo, twitchLogo);
		}
		
		rotationTO = setTimeout(showNames, displayTwitchForOriginal);
	}
});