define(['core'], function(core) {
	core.bar = {
		menu: {
			name      : 'bar',
			info      : 'control: arrowkey'
		},
		bgColor: '#f90',
		running: function() {
			console.log('bar');
		},
		end: function() {
			localStorage.setItem('game_' + core.bar.menu.name + '_highscore', core.bar.score);
			core.bar.score = 0;
		}
	};

	return 'bar';
});
