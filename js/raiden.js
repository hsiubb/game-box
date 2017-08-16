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

			'j': function() {
				core.curgame.fire();
			},
			'j_up': function() {
				core.raiden.fire_init = false;
				clearInterval(core.curgame.firing);
			},

			'mousedown': function() {
				core.curgame.fire();
			},
			'mouseup': function() {
				core.raiden.fire_init = false;
				clearInterval(core.curgame.firing);
			},
		},

		ship: core.units.ship(30, COLOR_WHITE),
		// enemy: core.units.ship(30, COLOR_ORANGE, Math.random() * FULL_WIDTH, 0, 180),
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
		fire_init: false,

		fire: function() {
			clearInterval(core.curgame.firing);
			core.curgame.firing = setInterval(function() {
				if(core.curgame.fire_init % 10 === 0) {
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
				}
				core.curgame.fire_init++;
			}, 30);
		},

		running: function() {
			// core.score++;
			core.raiden.barrage.update();
			let cur_move = core.raiden.direction.reduce(function(acc, val, idx) {
				if(val) {
					switch(idx) {
						case 0: core.raiden.ship_y-=5; break;
						case 1: core.raiden.ship_y+=5; break;
						case 2: core.raiden.ship_x-=5; break;
						case 3: core.raiden.ship_x+=5; break;
						default:;
					}
				};
				return acc || val;
			}, 0);

			if(!cur_move){
				core.raiden.ship_x = core.evntX;
				core.raiden.ship_y = core.evntY;
			} else {
				core.evntX = core.raiden.ship_x;
				core.evntY = core.raiden.ship_y;
			}

			core.raiden.ship.update(core.raiden.ship_x, core.raiden.ship_y);
			// core.raiden.enemy.top+=2;
			// core.raiden.enemy.update(core.raiden.enemy.left - core.raiden.enemy.size / 2, core.raiden.enemy.top + core.raiden.enemy.size / 2);
			// core.raiden.shield.update();
		},
		start: function() {
		}
	}

	return 'raiden';
});
