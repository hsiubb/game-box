define(['core', 'foo', 'bar'], function(core) {
	Object.prototype.hasClass = function(class_name) {
		let reg = new RegExp(class_name);
		return reg.test(this.getAttribute('class'));
	};
	Object.prototype.addClass = function(class_name) {
		if(!this.hasClass(class_name)) {
			let pre_class = this.getAttribute('class') || '';
			this.setAttribute('class', (pre_class.trim() + ' ' + class_name).trim());
		}
	};
	Object.prototype.removeClass = function(class_name) {
		if(this.hasClass(class_name)) {
			let pre_class = this.getAttribute('class');
			this.setAttribute('class', pre_class.replace(class_name, '').trim());
		}
	};
	String.prototype.trim = function() {
		var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
		return this == null ? "" : ( this + "" ).replace( rtrim, "" );
	}

	let args = Array.prototype.slice.call(arguments, 1);
	args.map(function(val) {
		let anchor = document.createElement('a');
		let class_name = arguments[1] === 0 ? 'game-btn focus-btn' : 'game-btn';
		anchor.setAttribute('class', class_name);
		anchor.setAttribute('href', 'javascript:;');
		anchor.setAttribute('data-game', val);
		anchor.innerHTML = val;
		core.controller.appendChild(anchor);

		let menu = document.createElement('div');
		menu.setAttribute('data-controller', val);
		menu.style.display = 'none';
		menu.addClass('game-controller');
		core[val].menu.highScore = localStorage.getItem('game_' + val + '_highscore') || 0;
		menu.innerHTML = '<h2>' + core[val].menu.name + '</h2>' +
			'<p>' + core[val].menu.info + '</p>' +
			'<span class="high-score">' + core[val].menu.highScore + '</span>' +
			'<br>' +
			'<a class="start-btn start" href="javascript:;" data-start="' + val + '">start</a>' +
			'<br>' +
			'<br>' +
			'<a class="game-btn menu" href="javascript:;">menu</a>';
		core[val].controller = menu;
		let body = document.getElementsByTagName('body')[0];
		body.appendChild(menu);
	});

	core.start();
});
