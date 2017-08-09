define(['core'], function(core) {
	core.raiden = {
		menu: {
			name: 'raiden',
			info: 'control: mouse'
		},
		bgColor: COLOR_BLUE,
		keys: [],
		keyEvent: function(key) {},

		ship: core.units.ship(30, COLOR_WHITE),
		shield: core.units.shield(30, COLOR_WHITE),

		// weapon: 'default',
		// fire: function() {
		// 	bullets: function(def_x, def_y, tar_x, tar_y) {},
		// 	switch(this.weapon) {
		// 		case 'default':
		// 			core.raiden.bullets(core.evntX, core.evntY, 0, core.evntY);
		// 			break;
		// 		default: ;
		// 	}
		// },

		running: function() {
			// core.score++;
			// core.dodge.barrage.update();
			core.raiden.ship.update();
			core.raiden.shield.update();
		},
		start: function() {
		}

	}

	return 'raiden';
});
