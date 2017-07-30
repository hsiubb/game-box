define(function() {
	const full_width = window.innerWidth;
	const full_height = window.innerHeight;

	// 初始化.start
	let core = {
		canvas: document.getElementById('gameBox'),
		controller: document.getElementById('gameController'),
		mainController: document.getElementById('gameController'),
		menu: [],
		start: function() {
			this.context = this.canvas.getContext("2d");
			this.canvas.style.width = this.canvas.width = full_width;
			this.canvas.style.height = this.canvas.height = full_height;

			// 點擊進入遊戲界面.start
			this.gameBtns = Array.prototype.slice.call(core.mainController.querySelectorAll('[data-game]'));
			this.gameBtns.map(function(val) {
				let game = val.getAttribute('data-game');
				val.addEventListener('click', function(evnt) {
					core.controller.style.display = 'none';
					core.controller = core[game].controller;
					core.controller.style.display = 'block';

					core.curname = game;
					core.curgame = core[game];
					core.running = core[game].running;
					core.bgColor = core[game].bgColor;

					core.context.fillStyle = core.bgColor;
					core.context.fillRect(0, 0, full_width, full_height);
				});

				val.onmouseenter = function() {
					let focusBtn = core.mainController.querySelector('.focus-btn');
					focusBtn && focusBtn.removeClass('focus-btn');
					// this.addClass('focus-btn');
				}
			});
			// 點擊進入遊戲界面.end

			// 點擊開始按鈕執行當前遊戲.start
			this.startBtns = Array.prototype.slice.call(document.querySelectorAll('[data-start]'));
			this.startBtns.map(function(val) {
				val.addEventListener('click', function(evnt) {
					core.controller.style.display = 'none';
					core.intervalClear = setInterval(core.clear, 30);
				});
			});
			// 點擊開始按鈕執行當前遊戲.end


			// 各遊戲結束按鈕.start
			core.endBtns = Array.prototype.slice.call(document.querySelectorAll('.menu'));
			core.endBtns.map(function(val) {
				val.addEventListener('click', function() {
					core.end();
				});
			});
			// 各遊戲結束按鈕.end
		},
		clear: function() {
			core.context.fillStyle = core.bgColor;
			core.context.fillRect(0, 0, full_width, full_height);

			core.running();
		},
		end: function() {
			core.running = false;
			core.curgame = false;
			clearInterval(core.intervalClear);

			core.context.fillStyle = '#fff';
			core.context.fillRect(0, 0, full_width, full_height);

			core.controller.style.display = 'none';
			core.controller = core.mainController;
			core.controller.style.display = 'block';
		},
		pause: function() {
			clearInterval(core.intervalClear);
			core.controller.querySelector('.high-score').innerHTML = core.curgame.score || 0;
			localStorage.setItem('game_' + core.curname + '_highscore', core.curgame.score || 0);
			core.controller.style.display = 'block';
		}
	};
	// 初始化.end


	// // 按鍵觸發事件.start
	// core.keyDownFunc = {
	// 	Escape: core.pause,
	// 	ArrowLeft  : function() {core.controller.querySelector('.game-btn').addClass('focus-btn')},
	// 	ArrowUp    : function() {core.controller.querySelector('.game-btn').addClass('focus-btn')},
	// 	ArrowRight : function() {core.controller.querySelector('.game-btn').addClass('focus-btn')},
	// 	ArrowDown  : function() {core.controller.querySelector('.game-btn').addClass('focus-btn')}
	// };
	// // 按鍵觸發事件.end
	//
	//
	// // 結束.start
	// document.onkeydown = function(evnt) {
	// 	let keyFunc = core.keyDownFunc[evnt.key];
	// 	(typeof keyFunc === 'function') ? keyFunc() : '';
	// };
	// // 結束.end
	//
	// core.controller.onmousemove = function() {
	// 	// let focusBtn = core.controller.querySelector('.focus-btn');
	// 	// if(focusBtn) {
	// 	// 	focusBtn.removeClass('focus-btn');
	// 	// }
	// };
  document.querySelector('body').addEventListener('keydown', function(evnt) {
    core.curgame && core.curgame.keyEvent(event.key);
  });

	document.querySelector('body').addEventListener('mousemove', function(evnt) {
		core.evntX = evnt.pageX;
		core.evntY = evnt.pageY;
    core.curgame && core.curgame.setPosition && core.setPosition();
	});

	return core;
});