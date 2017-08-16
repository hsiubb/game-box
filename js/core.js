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
// 		bgColor: COLOR_WHITE,
// 		keyEvent: {},
// 		running: function() {
// 		},
// 		start: function() {
// 		}
// 	}
// 	return 'NameOfGame';
// });
//
//////////////////////////////////////////////////

// musics https://www.youtube.com/audiolibrary/music

define(function() {
	// 初始化.start
	let core = {
		evntX: FULL_WIDTH / 2,
		evntY: FULL_HEIGHT / 2,
		gameTime: 0,
		frameRate: 30,
		canvas: document.getElementById('gameBox'),
		controller: document.getElementById('gameController'),
		mainController: document.getElementById('gameController'),
		infosColor: COLOR_WHITE,
		units: {
			ship: function(size, color, x, y, angle) {
				return {
					left:   (x || core.evntX) - size / 2,
					right:  (x || core.evntX) + size / 2,
					top:    (y || core.evntY) - size / 2,
					bottom: (y || core.evntY) + (size - 4) / 2,
					update: function(x, y) {
						let cur_x = x || core.evntX;
						let cur_y = y || core.evntY;
						this.left   = cur_x - size / 2;
						this.right  = cur_x + size / 2;
						this.top    = cur_y - size / 2;
						this.bottom = cur_y + size / 2 - 2;
						core.context.save();
						core.context.beginPath();
						core.context.translate(cur_x, cur_y);
						angle && core.context.rotate(angleToRadian(angle));
						core.context.moveTo( - size / 2 , size / 2 - 2 );
						core.context.lineTo( - 1        , size * .3    );
						core.context.lineTo( - 1        , - size / 2   );
						core.context.moveTo(   1        , - size / 2   );
						core.context.lineTo(   1        , size * .3    );
						core.context.lineTo( size / 2   , size / 2 - 2 );
						core.context.closePath();
						core.context.fillStyle = color;
						core.context.fill();
						core.context.restore();
					}
				};
			},
			shield: function(size, color) {
				return {
					x: core.evntX,
					y: core.evntY,

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
						// 	core.context.fillStyle = COLOR_WHITE;
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
				core.infosColor = COLOR_WHITE;
			}, 1000);
		},
		showScore: function() {
			core.context.font = '24px Arial';
			core.context.fillStyle = core.infosColor;
			core.context.fillText('score: ' + core.score, FULL_WIDTH - 150, 50);
		},
		clearPadding: function(color) {
			core.context.fillStyle = color;
			core.context.fillRect(0, core.curgame.size * core.curgame.height, FULL_WIDTH, FULL_HEIGHT);
			core.context.fillRect(core.curgame.size * core.curgame.width, 0, FULL_WIDTH, FULL_HEIGHT);
		},
		keepZone: function(x, y) {},
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

					core.gameTime = 0;
					core.curname  = game;
					core.curgame  = core[game];
					core.running  = core[game].running;
					core.bgColor  = core[game].bgColor;
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
					core.score = 0;
					core.curgame.start();
					core.intervalClear = setInterval(core.clear, core.frameRate);
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
			core.gameTime++;
			core.context.fillRect(0, 0, FULL_WIDTH, FULL_HEIGHT);

			core.running();
			core.showScore();
			core.infos();
		},
		menu: function() {
			core.running = false;
			core.curgame = false;
			clearInterval(core.intervalClear);

			core.context.fillStyle = COLOR_WHITE;
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


	document.oncontextmenu = function(evnt){return false;}
	document.addEventListener('mousemove', function(evnt) {
		core.evntX = evnt.pageX;
		core.evntY = evnt.pageY;
	});

	core.runEvent = function(evnt) {
		core.curgame && core.curgame.keyEvent.hasOwnProperty(evnt) && core.curgame.keyEvent[evnt](evnt);
	};
	document.addEventListener('mousedown', function(evnt) {
		core.runEvent('mousedown');
	});
	document.addEventListener('mouseup', function(evnt) {
		core.runEvent('mouseup');
	});
	document.addEventListener('keydown', function(evnt) {
		evnt.key === 'Escape' && core.menu();

		core.runEvent(evnt.key);
	});
	document.addEventListener('keyup', function(evnt) {
		core.runEvent(evnt.key+'_up');
	});

	return core;
});
