window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

	// initial canvas, variable, and utility function definitions
	var canvas = document.getElementById('screen');
	canvas.width = 100;
	canvas.height = 60;
	var ctx = canvas.getContext('2d');
	ctx.lineWidth = .5;
	var cw = canvas.width;
	var ch = canvas.height;
	var hue = 0;
	var rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);};

	var draw = function(){
		// clear canvas
		ctx.clearRect(0,0,cw,ch);

		// render 2x2 pixel colors
		var iw = Math.floor(cw/2);
		while(iw--){
			var ih = Math.floor(ch/2);
			while(ih--){
				ctx.fillStyle = 'hsla('+(hue+rand(0, 30)+iw)+', 100%, '+(80-ih)+'%, '+rand(80,100)/100+')';
				ctx.fillRect(Math.floor(iw*2),Math.floor(ih*2),2,2);
			}
		}

		// render dark horizontal lines
		ctx.strokeStyle = 'hsla(0, 100%, 0%, .3)';
		var j = Math.floor(ch/2);
		ctx.beginPath();
		while(j--){
			ctx.moveTo(0, (j*2)+.5);
			ctx.lineTo(cw, (j*2)+.5);
		}
		ctx.stroke();

		// rendd diagonal highlight
		ctx.strokeStyle = 'hsla(0, 100%, 100%, .3)';
		var z = Math.floor(ch/2);
		ctx.beginPath();
		while(z--){
			ctx.moveTo(0, (z*2)+.5);
			ctx.lineTo(cw, 0);
		}
		ctx.stroke();

		// cycle the hue
		if(hue < 360){
			hue += 1;
		} else {
			hue = 0;
		}

		// well, let's do it again!
		requestAnimFrame(draw, canvas);
	}

	draw();
