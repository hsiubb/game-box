define(['core'], function(core) {
	core.dodge = {
		menu: {
			name: 'dodge',
			info: 'control: mouse'
		},
		bgColor: '#38c',
		keys: [],
		keyEvent: function(key) {},

		baseSpeed: Math.pow(FULL_WIDTH * FULL_HEIGHT / 500000, 1/2),
		accuracy: 50,

		target: function(bullet) {
			bullet.targetX = core.evntX + Math.random() * core.dodge.accuracy - core.dodge.accuracy / 2 - bullet.x;
			bullet.targetY = core.evntY + Math.random() * core.dodge.accuracy - core.dodge.accuracy / 2 - bullet.y;
			bullet.speed = Math.pow(Math.pow(bullet.targetX, 2) + Math.pow(bullet.targetY, 2), 1 / 2) + Math.random() * 4;
			bullet.speedX = core.dodge.baseSpeed * bullet.targetX / bullet.speed;
			bullet.speedY = core.dodge.baseSpeed * bullet.targetY / bullet.speed;
		},
		ship: core.units.ship(14, '#f90'),
		barrage: {
			density: Math.floor(Math.pow(FULL_WIDTH * FULL_HEIGHT / 3, 1/2)),
			bulletUpdate: function(bullet) {
				bullet.x += bullet.speedX;
				bullet.y += bullet.speedY;
				if(
					bullet.x >= core.dodge.ship.left &&
					bullet.x <= core.dodge.ship.right &&
					bullet.y >= core.dodge.ship.top &&
					bullet.y <= core.dodge.ship.bottom
				) {
					if(Math.abs((bullet.x - core.evntX) / (bullet.y - core.evntY)) < .8) {
						core.end();
					} else {
						if(core.infos() !== 'showing info') {
							core.score += 10;
							core.showInfo('slip!');
						}
					}
				};

				if(bullet.x <= 0 || bullet.x >= FULL_WIDTH || bullet.y <= 0 || bullet.y >= FULL_HEIGHT) {
					switch(Math.floor(4 * Math.random().toFixed(3))) {
						case 0:
							bullet.x = 0;
							bullet.y = FULL_HEIGHT * Math.random().toFixed(3);
							break;
						case 1:
							bullet.x = FULL_WIDTH;
							bullet.y = FULL_HEIGHT * Math.random().toFixed(3);
							break;
						case 2:
							bullet.x = FULL_WIDTH * Math.random().toFixed(3);
							bullet.y = 0;
							break;
						case 3:
							bullet.x = FULL_WIDTH * Math.random().toFixed(3);
							bullet.y = FULL_HEIGHT;
							break;
					}
					core.dodge.target(bullet);
				}
				core.context.fillStyle = '#fff';
				core.context.fillRect(bullet.x - 1, bullet.y - 1, 2, 2);
			},
			bullets: function() {
				function Bullets() {
					if(!!Math.floor(Math.random() * 2)) {
						this.x = FULL_WIDTH * Math.random();
						this.y = FULL_HEIGHT * (Math.floor(Math.random() * 2) * .75 + Math.random() * .25);
					} else {
						this.x = FULL_WIDTH * (Math.floor(Math.random() * 2) * .75 + Math.random() * .25);
						this.y = FULL_HEIGHT * Math.random();
					}
					this.speedX = (Math.floor(Math.random() * 2) - .5 ) * 2;
					this.speedY = (Math.floor(Math.random() * 2) - .5 ) * 2;
				}

				for(let i=0; i<core.dodge.barrage.density; i++) {
					core.dodge.barrage[i] = new Bullets();
				}
			},
			update: function() {
				for(let i=0; i<core.dodge.barrage.density; i++) {
					core.dodge.barrage.bulletUpdate(core.dodge.barrage[i]);
				}
			}
		},
		running: function() {
			core.score++;
			core.dodge.barrage.update();
			core.dodge.ship.update();
		},
		start: function() {
			core.score = 0;
			core.dodge.barrage.bullets();
		}
	};

	return 'dodge';
});
