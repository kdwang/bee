
//	rely on jQuery

$(document).ready(function() {

	var startBtn = $('#startBtn');
	startBtn.click(function() {
		$(this).hide();

		Game.init('#game');

	})

	var Game = {

		init : function(id) { // init
			this.area = $(id);
			this.score();
			this.creatArmy();
			this.creatShip();
			this.moveShip();
		},

		score : function() { // top left score
			this.num = $('#score span');
		},

		army : { // include all invaders
			quantity : 35,
			inv_speed_x : 5,
			inv_speed_y : 20
		},

		creatArmy : function() { //
			var army = this.army;
			var oUl = $('<ul></ul>', { id : 'army' });

			this.oUl = oUl;

			oUl.appendTo(this.area);
			oUl.css({ left : (this.area.width() - oUl.width())/2 });  //set ul.width

			for(var i = 0; i < army.quantity; i++) {
				var oLi = $('<li></li>');
				oLi.appendTo(oUl);
			}

			this.moveArmy(army);
			this.transformInv();
		},

		moveArmy : function(army) { // move all invaders
			var _this = this;

			var left = 0;
			var right = _this.area.width() - _this.oUl.width();

			setInterval(function() {

				if(_this.oUl.position().left > right) {
					_this.oUl.css({ top : _this.oUl.position().top + army.inv_speed_y });
					army.inv_speed_x *= -1;
				} else if(_this.oUl.position().left < left) {
					_this.oUl.css({ top : _this.oUl.position().top + army.inv_speed_y });
					army.inv_speed_x *= -1;
				}

				_this.oUl.css({ left : _this.oUl.position().left + army.inv_speed_x });

			}, 100)
		},

		transformInv : function() { // change invs' pic
			var _this = this;

			setInterval(function() {

				_this.oUl.children().each(function() {

					if($(this).hasClass('anim')) {
						$(this).removeClass('anim');
					} else {
						$(this).addClass('anim');
					}
				})

			}, 800);

		},

		creatShip : function() {
			var  oShip = $('<div></div>', { id : 'ship' });
			
			oShip.appendTo(this.area);

			this.oShip = oShip;
		},

		moveShip : function() { // control the ship

			var timer = null;
			var dir = 0;
			var _this = this;

			document.onkeydown = function(e) {
				var e = e || window.event;

				if(!timer) {
					timer = setInterval(slide, 30);
				}

				if(e.keyCode == 37) { // left
					dir = 1;
				} else if (e.keyCode == 39) { // right
					dir = 2;
				}

				if(e.keyCode == 32) {
					return false
				}
			}

			document.onkeyup = function(e) {
				clearInterval(timer);
				timer = null;
				dir = 0;

				var e = e || window.event;

				if(e.keyCode == 32) {
					_this.createBullet();

					return false;  // prevent : pagedown
				}

			}

			function slide() {
				if(dir == 1) {
					_this.oShip.css({ left : _this.oShip.position().left - 6 });
				} else if(dir == 2) {
					_this.oShip.css({ left : _this.oShip.position().left + 6 });
				}
			}

		},

		createBullet : function() { // bullet
			var oB = $('<div></div', { class : 'bullet'});
			oB.appendTo(this.area);

			oB.css({ left : this.oShip.position().left + 14 });
			oB.css({ top : this.oShip.position().top - 12 });

			this.runBullet(oB);
		},

		runBullet : function(oB) { // shoot out 

			oB.timer = setInterval(function() {
				if(oB.position().top < 0) {
					// out screen
					clearInterval(oB.timer);
					oB.remove();
				} else {
					oB.css({ top : oB.position().top - 10 });
				}
			}, 30)

		}

	}

})