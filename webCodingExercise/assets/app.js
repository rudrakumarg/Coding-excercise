/**
 * @author Rudra Kumar
 */

window.DIGITANDO = window.DIGITANDO || {};
DIGITANDO.carArray = ["green", "blue", "dark", "purple", "red", "pink", "orange", "cyan"];
DIGITANDO.maxNumbers = 10;
DIGITANDO.uniqueRandoms = [];
DIGITANDO.numRandoms = 4;
DIGITANDO.noofPlayers = 2; ( function(DIGITANDO) {
		function init() {
			var _self = this, betArr = [], speedArr = [];

			_self.preload = function() {
				_self.run();
			};
			_self.run = function() {
				DIGITANDO.dgApp = new DIGITANDO.DGAPP();
			};
		}

		function dgApp() {
			var _this = this, initFunds;
			_this.betPlaced = false;
			initFunds = $("#inputfunds").val();

			$(".startgame").on("click", function() {

				DIGITANDO.noofPlayers = $(".noTrucks").val();
				$("#inifunds").text('$'+initFunds);
				if (DIGITANDO.noofPlayers > 0) {
					_this.startGame();
				} else {
					alert('Please select number of players!!');
				}

			});

			$(".placebet").on("click", function() {
				$(".popup_bet").show();
				$(".container_bet").html('');
				var num = DIGITANDO.noofPlayers;
				for (var i = 0; i < num; i++) {
					var texthtml = '<div><span> player ' + (i + 1) + '</span><span><input id="player_' + (i + 1) + '" type="text" /> </span></div>';
					$(".container_bet").append(texthtml);
				}
			});

			$(".startrace").on("click", function() {
				speedArr = [];
				if (_this.betPlaced) {
					var r = new _this.randomGenerator(1, numRandoms);

					for (var i = 0; i < numRandoms; i++) {

						_this.progress(DIGITANDO.carArray[i] + '_truck', r.get() * 20, i + 1);
					}
				} else {
					alert("Place Bet!!");
				}
			});

			$(".cancelbet").on("click", function() {
				_this.cancelbet();
			});

			$(".bet").on("click", function() {
				_this.betPlaced = true;
				_this.cancelbet();
				betArr = [];
				for (var i = 1; i <= DIGITANDO.noofPlayers; i++) {
					
					$("#label_" + i).text($("#player_" + i).val());
					betArr.push($("#player_" + i).val());
					
				}

			});

			$(".reset").on("click", function() {
				$(".container, .message").html("");
				_this.startGame();
				_this.betPlaced = false;
			});

			_this.startGame = function() {
				$(".popup_setup").hide();
				$(".raceTrack").show();
				speedArr = [];

				var num = DIGITANDO.noofPlayers;
				numRandoms = Number(num);
				//+1;
				//makeUniqueRandom();
				for (var i = 0; i < num; i++) {
					var texthtml = '<div class="truck_cont ' + DIGITANDO.carArray[i] + '" id="' + DIGITANDO.carArray[i] + '_truck"><div class="labeltext" id="label_' + (i + 1) + '"></div><i class="fa fa-truck"  aria-hidden="true"></i></div>' + '<div class="track"></div>';
					$(".container").append(texthtml);
				}
			};

			_this.progress = function(id, timer, index) {
				var x = 10, cI;
				console.log(id + ", " + timer);
				speedArr.push(timer);
				cI = setInterval(function() {
					if (x !== 95) {
						x += 5;
						_this.setLeft(id, x);
					} else {
						clearInterval(cI);
						if (index == speedArr.length) {
							console.log('done');
							_this.raceComplete();
						}
					}
				}, timer);
			};

			_this.randomGenerator = function(low, high) {
				if (arguments.length < 2) {
					high = low;
					low = 0;
				}
				this.low = low;
				this.high = high;
				this.reset();
			};

			_this.raceComplete = function() {
				var xminIndex, xmaxIndex, xmaxIndexval;
				xminIndex = _this.arrayMin(speedArr);
				 xminIndex = speedArr.indexOf(xminIndex);
				 
				xmaxIndexval = _this.arrayMax(betArr);
				 xmaxIndex = betArr.indexOf(xmaxIndexval);
				console.log(' betArr', betArr);
				console.log('speedArr',speedArr);
				console.log(xminIndex + ' '+ xmaxIndex);
				
				if(xminIndex === xmaxIndex) {
					$(".message").text("***congrats, you won $"+xmaxIndexval+" ! ***");
					initFunds = Number(initFunds) + 2*(xmaxIndexval);
					$("#inifunds").text('$'+initFunds);
				} else {
					$(".message").text("***sorry, you loose $"+xmaxIndexval+" ! ***");
					initFunds = Number(initFunds) - (xmaxIndexval);
					$("#inifunds").text('$'+initFunds);
				}
			};

			_this.randomGenerator.prototype = {
				reset : function() {
					this.remaining = [];
					for (var i = this.low; i <= this.high; i++) {
						this.remaining.push(i);
					}
					console.log(this.remaining);
				},
				get : function() {
					if (!this.remaining.length) {
						this.reset();
					}
					var index = Math.floor(Math.random() * this.remaining.length);
					var val = this.remaining[index];
					this.remaining.splice(index, 1);
					return val;
				}
			};

			_this.arrayMin = function(arr) {
				var len = arr.length, min = Infinity;
				while (len--) {
					if (arr[len] < min) {
						min = arr[len];
					}
				}
				return min;
			};

			_this.arrayMax = function(arr) {
				var len = arr.length, max = -Infinity;
				while (len--) {
					if (arr[len] > max) {
						max = arr[len];
					}
				}
				return max;
			};

			_this.setLeft = function(id, val) {
				document.getElementById(id).style.left = val + '%';
			};

			_this.cancelbet = function() {
				$(".popup_bet").hide();
			};

		}


		DIGITANDO.INIT = init;
		DIGITANDO.DGAPP = dgApp;

	}(window.DIGITANDO));
