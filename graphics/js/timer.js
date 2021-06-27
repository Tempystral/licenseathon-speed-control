'use strict';
$(() => {
	// The bundle name where all the run information is pulled from.
	var speedcontrolBundle = 'nodecg-speedcontrol';
	
	// This is where the timer information is received.
	// The "change" event is triggered whenever the time changes or the state changes.
	var timer = nodecg.Replicant('timer', speedcontrolBundle);
	var runDataActiveRun = nodecg.Replicant('runDataActiveRun', speedcontrolBundle);
	timer.on('change', (newVal, oldVal) => {
		if (newVal)
			updateTimer(newVal, oldVal);
	});
	
	// Sets the timer text and classes.
	function updateTimer(newVal, oldVal) {
		// Change class on the timer to change the colour if needed.
		// See the common.css file for more information.
		if (oldVal) $(`.timerContainer .timer`).toggleClass('timer_'+oldVal.state, false);
		$(`.timerContainer .timer`).toggleClass('timer_'+newVal.state, true);

		$(`.timerContainer .timer`).html(newVal.time);

		const finishTimes = newVal.teamFinishTimes;
		const teams = runDataActiveRun.value.teams;
		// If any team is finished...
		if (Object.keys(finishTimes).length) {
			for (let id in finishTimes) { // Get the id for all ids in finishTimes
				// Find the index of the finished team's ID
				const index = teams.findIndex(x => x.id == id);
				const time = finishTimes[id].time;
				const state = finishTimes[id].state;
				// Remove all other decoration classes from the affected timer and apply the timer_completed class
				$(`.timerContainer[timer-id=${index + 1}] .timer`).html(time).toggleClass('timer_stopped timer_running timer_paused', false).toggleClass(`timer_${state}`, true);
				$(`.timerContainer[timer-id=${index + 1}]`).slideDown("fast");
			}
		}
		// Cleanup - finds IDs not in the list of finished teams and removes the timer_finished class
		for (let i = 0; i < teams.length; i++){
			if (!(teams[i].id in timer.value.teamFinishTimes)) {
				$(`.timerContainer[timer-id=${i + 1}]`).slideUp({duration:"fast", done:removeFinishStyle(i)});
				//$(`.timerContainer[timer-id=${i + 1}] .timer`).toggleClass('timer_completed timer_forfeit', false);
			}
		}
	}

	function removeFinishStyle(timerIndex){
		$(`.timerContainer[timer-id=${timerIndex + 1}] .timer`).toggleClass('timer_completed timer_forfeit', false);
	}
})