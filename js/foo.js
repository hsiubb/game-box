define(['core'], function(core) {
	core.foo = {
		menu: {
			name      : 'foo',
			info      : 'control: mouse'
		},
		bgColor: '#09f',
		score: 0,
		running: function() {
			core.foo.score++;
		},
		end: function() {
			localStorage.setItem('game_' + core.foo.menu.name + '_highscore', core.foo.score);
			core.foo.score = 0;
		}
	};

	return 'foo';
});
