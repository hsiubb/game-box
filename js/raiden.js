define(['core'], function(core) {
	core.raiden = {
		menu: {
			name: 'raiden',
			info: 'control: mouse'
		},
		bgColor: '#38c',
		keys: [],
		keyEvent: function(key) {},

		ship: core.units.ship(18, '#fff'),
		shield: core.units.shield(30, '#fff'),

		running: function() {
			// core.score++;
			// core.dodge.barrage.update();
			core.raiden.ship.update(core.evntX, core.evntY);
			core.raiden.shield.update();
		},
		start: function() {
		}

	}

	return 'raiden';
});
