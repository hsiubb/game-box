var snowing = function() {
	var snowflakes = [];
	var count_wind;

	var snowZone = {
	    canvas : document.getElementById("snow_box"),
	    start : function() {
					this.wind = 2;
					snowZone.wind_next = 2;
	        this.canvas.width = 1200;
	        this.canvas.height = 800;
					this.frameNo = 0;
	        this.context = this.canvas.getContext("2d");
	        this.interval = setInterval(updateSnowZone, 20);
	    },
			clear : function() {
				this.frameNo += 1;
				this.context.fillStyle = '#38c';
				this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
			},
			stop: function() {
				clearInterval(this.interval);
			}
	}

	function CountWind() {
		this.context = snowZone.context;

		this.x = 0;
		this.y = 0;

		this.update = function() {
			this.context.font = '30px consolas';
			this.context.fillStyle = '#fff';
			this.context.fillText(snowZone.wind, this.x, this.y);
			console.log(snowZone.wind);
		}
		// this,
	};

	function Snowflakes() {
		this.endX = snowZone.canvas.width;
		this.endY = snowZone.canvas.height;
		this.x = 0;
		this.y = snowZone.canvas.height+1;
		this.speedY = Number(this.endX/800 * Math.random().toFixed(3));
		this.radius = Math.floor(9 * Math.random()) / 2 + 1;
		this.context = snowZone.canvas.getContext("2d");
		this.update = function() {
			this.x += snowZone.wind;
			this.y += this.speedY;
			if((this.x < -this.endX) || (this.x > this.endX*2) || (this.y > this.endY)) {
				this.x = Number(this.endX * 3 * Math.random().toFixed(3) - this.endX);
				if(this.x > 0 || this.x < this.endX) {
					this.y = Number(this.endY * Math.random().toFixed(3) - this.endY);
				} else {
					this.y = Number(this.endY * Math.random().toFixed(3));
				}
			}
			this.context.beginPath();
			this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true); //Math.PI*2是JS计算方法，是圆
			this.context.closePath();
			this.context.fillStyle = '#fff';
			this.context.fill();
		}
	}

	function everyinterval(n) {
		if((snowZone.frameNo / n) % 1 == 0) {
			snowZone.wind_next = Number((4*Math.random() - 2).toFixed(3));
			return true;
		}
		return false;
	}

	function updateSnowZone() {
		snowZone.clear();
		if(snowZone.frameNo == 1 || everyinterval(1000)) {
			snowZone.wind_next = Number((4*Math.random() - 2).toFixed(3));
			if((snowZone.wind - snowZone.wind_before) > 2 ) {
				snowZone.wind = snowZone.wind_before + 2;
			} else if((snowZone.wind - snowZone.wind_before) < -2){
					snowZone.wind = snowZone.wind_before - 2;
			}
		}
		count_wind.update();
		if(snowZone.wind_next - snowZone.wind >= .05) {
			snowZone.wind += .05;
		} else if(snowZone.wind_next - snowZone.wind <= .05) {
				snowZone.wind -= .05;
		}
		for(var i=0; i<snowflakes.length; i++) {
			snowflakes[i].update();
		}
	}

	function get_snowflakes() {
	    snowZone.start();
			count_wind = new CountWind();
			for(var i=0; i<1000; i++) {
				snowflakes[i] = new Snowflakes();
			}
	}

	return {
		init: function(options) {
			get_snowflakes();
		}
	}
}();
