var mouseX = 0;
var mouseY = 0;
var tickCounter = undefined;

$('body').html($('body').html() + "<div id='speedreed'>ArnoldFacepalmer</div>");
$('#speedreed').hide();

function Timer(callback, delay) {
	var timerId, start, remaining = delay;

	this.pause = function() {
		clearInterval(timerId);
		remaining -= new Date() - start;
	};

	this.resume = function() {

		start = new Date();
		setTimeout(function() {
			timerId = setInterval(callback, delay);
		}, remaining);

		remaining = delay;

	};

	this.clearInterval = function() {
		clearInterval(timerId);
	}

	this.resume();
}

$('*').click(function(event) {
	var mouseButton = event.which;
	var div = $('#speedreed');

	if (mouseButton == 2) {
		if (event.eventPhase == 2) {

			div.css('top', mouseY - 100);
			div.css('left', mouseX - 200);

			var data = event.currentTarget.innerText;
			data = data.split(' ');

			div.html(data[0]);
			div.show();

			div.css('display', 'block');

			setTimeout(function() {
				tickCounter = new Timer(function() {

					if (data.length > 0) {

						var word = data.shift();

						if (word.length >= 8) {

							if (word.length >= 10) {
								delay = 100;
							} else {
								delay = 50;
							}

							tickCounter.pause();
							setTimeout(function() {
								tickCounter.resume();
							}, 50)

						}

						div.html(word);

					} else {

						tickCounter.clearInterval();
						tickCounter = undefined;
						setTimeout(function() {
							div.hide();
						}, 500);

					}
				}, 100);
			}, 100);
		}
	} else {

		div.hide();

		if (tickCounter != undefined) {
			tickCounter.clearInterval();
			tickCounter = undefined;

		}

	}
});

$(document).mousemove(function(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
});