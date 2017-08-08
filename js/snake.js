define(['core'], function(core) {
	core.snake = {
		menu: {
			name: 'snake',
			info: 'control: arrowkey'
		},
		bgColor: '#38c',
		keys: ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'],
		keyEvent: function(key) {
			switch(key) {
				case 'ArrowUp':    core.snake.path !== 'ArrowDown'  && (core.snake.path = key); break;
				case 'ArrowDown':  core.snake.path !== 'ArrowUp'    && (core.snake.path = key); break;
				case 'ArrowLeft':  core.snake.path !== 'ArrowRight' && (core.snake.path = key); break;
				case 'ArrowRight': core.snake.path !== 'ArrowLeft'  && (core.snake.path = key); break;
			}
		},

		path: 'ArrowUp',
		baseSpeed: 4,
		difficulty: 50,
		snakeColor: '#fff',
		body: [],

		dropfood: function() {
			core.context.beginPath();
			core.context.arc((core.snake.foodx + .5) * core.snake.size, (core.snake.foody + .5) * core.snake.size, core.snake.size / 2 - 1, 0, Math.PI * 2, true);
			core.context.closePath();
			core.context.fillStyle = '#c96';
			core.context.fill();
		},

		walk: function() {
			switch(core.snake.path) {
				case 'ArrowUp':    core.snake.y--; break;
				case 'ArrowDown':  core.snake.y++; break;
				case 'ArrowLeft':  core.snake.x--; break;
				case 'ArrowRight': core.snake.x++; break;
				default: core.snake.y--;
			}

			if(
				core.snake.x < 0 ||
				core.snake.x > core.snake.width ||
				core.snake.y < 0 ||
				core.snake.y > core.snake.height ||
				core.snake.body.indexOf([core.snake.x, core.snake.y]) > -1
			) {
				core.end();
			}

			if(core.snake.x === core.snake.foodx && core.snake.y === core.snake.foody) {
				core.score += 10;
				core.snake.body.unshift([-2, -2]);
				core.snake.foodx = Math.floor(Math.random() * this.width);
				core.snake.foody = Math.floor(Math.random() * this.height);
			}

			core.snake.body.push([core.snake.x, core.snake.y]);
			core.snake.body.shift();
		},
		running: function() {
			core.score++;

			core.snake.dropfood();

			core.snake.body.map(function(val) {
				core.context.fillStyle = core.snake.snakeColor;
				core.context.fillRect(val[0] * core.snake.size + 1, val[1] * core.snake.size + 1, core.snake.size - 2, core.snake.size - 2);
			});

			(core.score % core.snake.baseSpeed === 0) && core.snake.walk();
		},
		start: function() {
			core.score = 0;

			this.size = Math.max(Math.min(FULL_WIDTH / this.difficulty, FULL_HEIGHT / this.difficulty, 20), 10);
			this.x = Math.floor(FULL_WIDTH / this.size / 2);
			this.y = Math.floor(FULL_HEIGHT / this.size / 2);
			this.width = this.x * 2;
			this.height = this.y * 2;

			core.snake.body = [
				[core.snake.x, core.snake.y + 4],
				[core.snake.x, core.snake.y + 3],
				[core.snake.x, core.snake.y + 2],
				[core.snake.x, core.snake.y + 1],
				[core.snake.x, core.snake.y],
			];

			this.foodx = Math.floor(Math.random() * this.width);
			this.foody = Math.floor(Math.random() * this.height);
		}
	};

	return 'snake';
});
