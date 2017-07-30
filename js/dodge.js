define(['core'], function(core) {
	core.dodge = {
		menu: {
			name      : 'dodge',
			info      : 'control: mouse'
		},
		bgColor: '#f90',
		keys: [],
		keyEvent: function(key) {},
		running: function() {
			console.log('dodge');
		}
	};

	return 'dodge';
});
