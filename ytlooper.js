
console.log("hello");
var button=document.createElement('span');
button.innerHTML='<button id="watch-loop" class="yt-uix-button yt-uix-button-text yt-uix-tooltip" type="button"'+ 
		'title="Loop this video"'+
		'data-orientation="vertical" '+
		'data-position="bottomright" '+ 
		'data-button-toggle="true" '+
		'data-tooltip-text="Loop this video"'+ 
		'role="button"> '+
		'	<span class="yt-uix-button-content">Loop </span>'+ 
	'</button>';
    document.getElementById('watch8-secondary-actions').appendChild(button);

	function inject(fn) {
	var script = document.createElement('script');
	script.innerHTML = '(' + fn.toString() + ')();';
	document.body.appendChild(script);
}

// This function listens for the video ending and restarts it if we're looping. Inject
// it into the page. Note that we can't access any variables outside the function here.
inject(function () {
	var looping = false;
	console.log("looping");
	


// This function listens for the video ending and restarts it if we're looping. Inject
// it into the page. Note that we can't access any variables outside the function here.

	// Controls whether we're looping.


	// Listen for the button click.
	document.getElementById('watch-loop').onclick = function () {
		looping = !looping;
		console.log('inject');
		this.setAttribute('data-tooltip-text', looping ? 'Turn off looping' : 'Loop this video');
		var loop =document.getElementsByClassName('ytp-menuitem')[3].setAttribute('aria-checked',looping?'false':'true');
		
		console.log(loop);
		return false;
	};

	// Returns the player API interface or false if it's not ready.
	function getPlayer() {
		return window.yt.player
			&& window.yt.player.getPlayerByElement
			&& window.yt.player.getPlayerByElement(document.getElementById('player-api'));
	}

	// Listen for the end of the video.
	function attach() {
		var player = getPlayer();
		player.addEventListener('onStateChange', function (state) {
			if (state == '0' && looping)
            {
                    player.seekTo(1,true);
                	player.playVideo();
            }
			
		});
	}

	// Wait until the YouTube API's ready.
	function wait() {
		setTimeout(getPlayer() ? attach : wait, 100);
	}

	wait();
});
