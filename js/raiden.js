define(['core'], function(core) {
	core.raiden = {
		menu: {
			name: 'raiden',
			info: 'control: mouse'
		},
		bgColor: COLOR_BLUE,
		keys: ['mousedown'],
		keyEvent: function(evnt) {
			(core.gameTime % core.raiden.bulletFrame === 0) && core.raiden.fire();
		},

		ship: core.units.ship(30, COLOR_WHITE),
		shield: core.units.shield(30, COLOR_WHITE),

		bulletColor: COLOR_WHITE,
		bulletSpeed: 10, // 子弹速度
		bulletFrame: 10, // 连射时子弹射出频率
		barrage: {
			bullets: [],
			bulletUpdate: function(bullet) {
				bullet.x += bullet.speedX;
				bullet.y += bullet.speedY;

				core.context.fillStyle = core.raiden.bulletColor;
				core.context.fillRect(bullet.x - 1, bullet.y - 1, 2, 2);
			},
			getBullet: function(angle, x, y) {
				let newBullet = {};
				newBullet.x = x || core.evntX;
				newBullet.y = y || core.evntY;
				newBullet.speedX = core.raiden.bulletSpeed * Math.sin(Math.PI + abvleToRadian(angle));
				newBullet.speedY = core.raiden.bulletSpeed * Math.cos(Math.PI + abvleToRadian(angle));

				core.raiden.barrage.bullets.push(newBullet);
			},
			update: function() {
				core.raiden.barrage.bullets = core.raiden.barrage.bullets.filter(function(bullet) {
					// (core.gameTime % core.raiden.bulletSpeed === 0) &&
					core.raiden.barrage.bulletUpdate(bullet);

					return (bullet.x > 0) && (bullet.x < FULL_WIDTH) && (bullet.y > 0) && (bullet.y < FULL_HEIGHT);
				});
			}
		},

		weapon: 'gun1',

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
					core.raiden.barrage.getBullet(20);
					core.raiden.barrage.getBullet(-20);
					break;
				case 'shotgun2':
					core.raiden.barrage.getBullet(0);
					core.raiden.barrage.getBullet(15);
					core.raiden.barrage.getBullet(-15);
					core.raiden.barrage.getBullet(30);
					core.raiden.barrage.getBullet(-30);
					break;
				case 'firegun':
					core.raiden.barrage.getBullet(60);
					break;
				case 'tracking' : core.raiden.barrage.getBullet(60); break;
				default: core.raiden.barrage.getBullet(0);
			};
		},

		running: function() {
			// core.score++;
			core.raiden.barrage.update();
			core.raiden.ship.update();
			// core.raiden.shield.update();
		},
		start: function() {
		}
	}

	return 'raiden';
});
