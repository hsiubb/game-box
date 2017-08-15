define(['core'], function(core) {
	core.raiden = {
		menu: {
			name: 'raiden',
			info: 'control: mouse'
		},
		bgColor: COLOR_BLUE,
		keyEvent: {
			'ArrowUp': function() {
				core.raiden.direction[0] = true;
			},
			'ArrowDown': function() {
				core.raiden.direction[1] = true;
			},
			'ArrowLeft': function() {
				core.raiden.direction[2] = true;
			},
			'ArrowRight': function() {
				core.raiden.direction[3] = true;
			},
			'ArrowUp_up':    function() {core.raiden.direction[0] = false;},
			'ArrowDown_up':  function() {core.raiden.direction[1] = false;},
			'ArrowLeft_up':  function() {core.raiden.direction[2] = false;},
			'ArrowRight_up': function() {core.raiden.direction[3] = false;},
			' ': function() {
				let count = 0;
				clearInterval(core.curgame.firing);
				core.curgame.firing = setInterval(function() {
					count % 10 === 0 && core.raiden.fire();
					count++;
				}, 30);
			},
			' _up': function() {
				clearInterval(core.curgame.firing);
			},
			'mousedown': function() {
				let count = 0;
				clearInterval(core.curgame.firing);
				core.curgame.firing = setInterval(function() {
					count % 10 === 0 && core.raiden.fire();
					count++;
				}, 30);
			},
			'mouseup': function() {
				clearInterval(core.curgame.firing);
			},
		},

		ship: core.units.ship(30, COLOR_WHITE),
		ship_x: core.evntX,
		ship_y: core.evntY,
		shield: core.units.shield(30, COLOR_WHITE),
		direction: [false,false,false,false],

		bulletColor: COLOR_WHITE,
		bulletSpeed: 10, // 子弹速度
		bulletFrame: 10, // 连射时子弹射出频率
		barrage: {
			bullets: [],
			bulletUpdate: function(bullet) {
				bullet.x += bullet.speedX;
				bullet.y += bullet.speedY;

				core.context.fillStyle = core.raiden.bulletColor;
				core.context.fillRect(bullet.x - 1, bullet.y - 1, 2, 6);
			},
			getBullet: function(angle, x, y) {
				let newBullet = {};
				newBullet.x = x || core.raiden.ship_x || core.evntX;
				newBullet.y = y || core.raiden.ship_y || core.evntY;
				newBullet.speedX = core.raiden.bulletSpeed * Math.sin(Math.PI + angleToRadian(angle));
				newBullet.speedY = core.raiden.bulletSpeed * Math.cos(Math.PI + angleToRadian(angle));

				core.raiden.barrage.bullets.push(newBullet);
			},
			update: function() {
				core.raiden.barrage.bullets = core.raiden.barrage.bullets.filter(function(bullet) {
					// (core.gameTime % core.raiden.bulletSpeed === 0) &&
					core.raiden.barrage.bulletUpdate(bullet);

					return !(bullet.y < 0 || bullet.x < 0 || bullet.x > FULL_WIDTH || bullet.y > FULL_HEIGHT);
				});
			}
		},

		weapon: 'shotgun',
		firing: false,

		fire: function() {
			switch(core.raiden.weapon) {
				case 'gun1':
					core.raiden.barrage.getBullet(0);
					break;
				case 'gun2':
					core.raiden.barrage.getBullet(0, core.evntX - 2);
					core.raiden.barrage.getBullet(0, core.evntX + 2);
					break;
				case 'shotgun':
					core.raiden.barrage.getBullet(0);
					core.raiden.barrage.getBullet(24);
					core.raiden.barrage.getBullet(-24);
					break;
				case 'shotgun2':
					core.raiden.barrage.getBullet(0);
					core.raiden.barrage.getBullet(15);
					core.raiden.barrage.getBullet(-15);
					core.raiden.barrage.getBullet(30);
					core.raiden.barrage.getBullet(-30);
					break;
				case 'firegun':
					core.raiden.barrage.getBullet(80);
					core.raiden.barrage.getBullet(-80);
					break;
				case 'tracking' : core.raiden.barrage.getBullet(0); break;
				default: core.raiden.barrage.getBullet(0);
			};
		},

		running: function() {
			// core.score++;
			core.raiden.barrage.update();
			core.raiden.direction.map(function(val, idx) {
				if(val) {
					switch(idx) {
						case 0: core.raiden.ship_y-=5;console.log(0); break;
						case 1: core.raiden.ship_y+=5;console.log(1); break;
						case 2: core.raiden.ship_x-=5;console.log(2); break;
						case 3: core.raiden.ship_x+=5;console.log(3); break;
						default:;
					}
				};
			});
			core.raiden.ship.update(core.raiden.ship_x, core.raiden.ship_y);
			// core.raiden.shield.update();
		},
		start: function() {
		}
	}

	return 'raiden';
});
