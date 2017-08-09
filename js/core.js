//////////////////////////////////////////////////
//
// ### define new game ###
//
// define(['core'], function(core) {
// 	core.NameOfGame = {
// 		menu: {
// 			name: 'NameOfGame',
// 			info: 'control: ..'
// 		},
// 		bgColor: '#fff',
// 		keys: [],
// 		keyEvent: function(key) {},
// 		running: function() {
// 		},
// 		start: function() {
// 		}
// 	}
// 	return 'NameOfGame';
// });
//
//////////////////////////////////////////////////

define(function() {
	// 初始化.start
	let core = {
		canvas: document.getElementById('gameBox'),
		controller: document.getElementById('gameController'),
		mainController: document.getElementById('gameController'),
		infosColor: '#fff',
		units: {
			ship: function(size, color) {
				return {
					left:   core.evntX - size / 2,
					right:  core.evntX + size / 2,
					top:    core.evntY - (size - 2) / 2,
					bottom: core.evntY + (size - 2) / 2,
					update: function(x, y) {
						this.left = x - size / 2;
						this.right = x + size / 2;
						this.top = y - (size - 2) / 2;
						this.bottom = y + (size - 2) / 2;
						core.context.beginPath();
						core.context.moveTo( this.left , this.bottom    );
						core.context.lineTo( x - 1     , y + size * .35 );
						core.context.lineTo( x - 1     , y - size * .35 );
						core.context.moveTo( x + 1     , y - size * .35 );
						core.context.lineTo( x + 1     , y + size * .35 );
						core.context.lineTo( this.right, this.bottom    );
						core.context.closePath();
						core.context.fillStyle = color;
						core.context.fill();
					}
				};
			},
			shield: function(size, color) {
				return {
					x:      core.evntX,
					y:      core.evntY,

					shield: true,
					radius_speed : Math.PI / 24,
					radiu_piece: 6,
					radiu_start : 0,
					shield_color: color,
					shield_num : 1,

					update: function() {
						this.x = core.evntX;
						this.y = core.evntY;
						this.radiu_start += this.radius_speed;
						this.radiu_start %= (Math.PI * 2);
						if(this.shield) {
							for(let i = 0; i < this.radiu_piece; i++) {
								core.context.beginPath();
								core.context.arc(this.x, this.y, size, this.radiu_start + Math.PI / 3 * i, this.radiu_start + Math.PI / 6 + Math.PI / 3 * i);
								core.context.closePath();
								core.context.fillStyle = this.shield_color;
								core.context.fill();
							}
						}
						// if(this.shield_num > 0) {
						// 	core.context.font = '14px Arial';
						// 	core.context.fillStyle = '#fff';
						// 	core.context.fillText('shield: '+this.shield_num, full_width - 104, full_height - 40);
						// }
					}
				};
			}
		},
		infos: function() {},
		showInfo: function(txt) {
			core.infos = function() {
				core.context.font = '32px Arial';
				core.context.fillStyle = core.infosColor;
				core.context.fillText(txt, 50, 100);
				return 'showing info';
			};
			setTimeout(function() {core.infosColor = '#eee'}, 500);
			setTimeout(function() {core.infosColor = '#ddd'}, 650);
			setTimeout(function() {core.infosColor = '#ccc'}, 750);
			setTimeout(function() {core.infosColor = '#bbb'}, 850);
			setTimeout(function() {
				core.infos = function(){};
				core.infosColor = '#fff';
			}, 1000);
		},
		start: function() {
			this.context = this.canvas.getContext("2d");
			this.canvas.style.width = this.canvas.width = FULL_WIDTH;
			this.canvas.style.height = this.canvas.height = FULL_HEIGHT;

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
					// core.curgame.start();

					// core.unitSize = Math.max(Math.min(FULL_WIDTH / core.curgame.difficulty, FULL_HEIGHT / core.curgame.difficulty, 20), 10);

					core.context.fillStyle = core.bgColor;
					core.context.fillRect(0, 0, FULL_WIDTH, FULL_HEIGHT);
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
					core.canvas.addClass('game-playing');
					core.curgame.start();
					core.intervalClear = setInterval(core.clear, 30);
				});
			});
			// 點擊開始按鈕執行當前遊戲.end


			// 各遊戲結束按鈕.start
			core.endBtns = Array.prototype.slice.call(document.querySelectorAll('.menu'));
			core.endBtns.map(function(val) {
				val.addEventListener('click', function() {
					core.menu();
				});
			});
			// 各遊戲結束按鈕.end
		},
		clear: function() {
			core.context.fillStyle = core.bgColor;
			core.context.fillRect(0, 0, FULL_WIDTH, FULL_HEIGHT);

			core.running();
			core.infos();
		},
		menu: function() {
			core.running = false;
			core.curgame = false;
			clearInterval(core.intervalClear);

			core.context.fillStyle = '#fff';
			core.context.fillRect(0, 0, FULL_WIDTH, FULL_HEIGHT);

			core.canvas.removeClass('game-playing');
			core.controller.style.display = 'none';
			core.controller = core.mainController;
			core.controller.style.display = 'block';
		},
		end: function() {
			clearInterval(core.intervalClear);
			core.canvas.removeClass('game-playing');
			if(core.score > localStorage.getItem('game_' + core.curname + '_highscore')) {
				core.controller.querySelector('.high-score').innerHTML = 'high-score: ' + (core.score || 0);
				localStorage.setItem('game_' + core.curname + '_highscore', core.score || 0);
			}
			core.controller.style.display = 'block';
		},
	};
	// 初始化.end


	// 按鍵觸發事件.start
	// core.keyDownFunc = {
	// 	Escape: core.end,
	// 	ArrowLeft  : function() {core.controller.querySelector('.game-btn').addClass('focus-btn')},
	// 	ArrowUp    : function() {core.controller.querySelector('.game-btn').addClass('focus-btn')},
	// 	ArrowRight : function() {core.controller.querySelector('.game-btn').addClass('focus-btn')},
	// 	ArrowDown  : function() {core.controller.querySelector('.game-btn').addClass('focus-btn')}
	// };
	// 按鍵觸發事件.end
	//
	//
	// 結束.start
	// document.onkeydown = function(evnt) {
	// 	let keyFunc = core.keyDownFunc[evnt.key];
	// 	(typeof keyFunc === 'function') ? keyFunc() : '';
	// };
	// 結束.end
	//
	// core.controller.onmousemove = function() {
	// 	// let focusBtn = core.controller.querySelector('.focus-btn');
	// 	// if(focusBtn) {
	// 	// 	focusBtn.removeClass('focus-btn');
	// 	// }
	// };
	document.querySelector('body').addEventListener('keydown', function(evnt) {
		evnt.key === 'Escape' && core.menu();

		core.curgame && core.curgame.keys.indexOf(event.key) >= 0 && core.curgame.keyEvent(event.key);
	});

	document.querySelector('body').addEventListener('mousemove', function(evnt) {
		core.evntX = evnt.pageX;
		core.evntY = evnt.pageY;
		core.curgame && core.curgame.setPosition && core.setPosition();
	});

	return core;
});
