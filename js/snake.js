define(['core'], function(core) {
	core.snake = {
		menu: {
			name      : 'snake',
			info      : 'control: arrowkey'
		},
		bgColor: '#09f',
		score: 0,
		keys: ['w','s','a','d'],
		keyEvent: function(key) {
			switch(key) {
				case 'w': console.log('wwwwwww'); break;
				case 's': console.log('sssssss'); break;
				case 'a': console.log('aaaaaaa'); break;
				case 'd': console.log('ddddddd'); break;
				default:;
			}
		},
		running: function() {
			core.foo.score++;
			localStorage.setItem('game_' + core.foo.menu.name + '_highscore', core.foo.score);
		}
	};

	return 'snake';
});
