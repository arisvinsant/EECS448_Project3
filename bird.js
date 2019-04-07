var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

function Bird(x, y, image) {
	this.x = x,
	this.y = y,
	this.width = image.width / 2,
	this.height = image.height,
	this.image = image;
	this.draw = function(context, state) {
		if (state === "up")
			context.drawImage(image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
		else{
			context.drawImage(image, this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
		}
	}
};

function FlappyBird() {}
FlappyBird.prototype = {
	bird: null, // bird
	bg: null, // background

	mapWidth: 340, // width
	mapHeight: 453, // height
	startX: 90, // intinal position
	startY: 225,
	upSpeed: 7, // Up speed
	downSpeed: 2, // Down speed
	line: 56, // height of land
	
	CreateMap: function() {
		// back ground
		this.bg = new Image();
		this.bg.src = "img/bg.png";
		var startBg = new Image();
		startBg.src = "img/start.jpg";
		// draw imgs
		startBg.onload = function(){
			c.drawImage(startBg, 0, 0);
		};

		//bird
		var image = new Image();
		image.src = "img/bird.png";		
		image.onload = function(){
			this.bird = new Bird(this.startX, this.startY, image);
		}.bind(this);
	},

	CanMove: function() { 
		if (this.bird.y < 0 || this.bird.y > this.mapHeight - this.bird.height - this.line) {
			this.gameOver = true;
		} else {
			var boundary = [{
				x: this.bird.x,
				y: this.bird.y
			}, {
				x: this.bird.x + this.bird.width,
				y: this.bird.y
			}, {
				x: this.bird.x,
				y: this.bird.y + this.bird.height
			}, {
				x: this.bird.x + this.bird.width,
				y: this.bird.y + this.bird.height
			}];
		}
	},
	CheckTouch: function() {       
		if (this.touch) {
			this.bird.y -= this.upSpeed;
			this.bird.draw(c, "up");
		} else {
			this.bird.y += this.downSpeed;
			this.bird.draw(c, "down");
		}
	},
	ClearScreen: function() { // when begin the game, clean the screen and add bird and pipes
		c.drawImage(this.bg, 0, 0);
	},
	ShowOver: function() {
		var overImg = new Image();
		overImg.src = "img/over.png";
		overImg.onload = function(){
			c.drawImage(overImg, (this.mapWidth - overImg.width) / 2, (this.mapHeight - overImg.height) / 2 - 50);
		}.bind(this);
		return;
	}
};

var game = new FlappyBird();
var Speed = 20;
var IsPlay = false;
var GameTime = null;
var btn_start;
window.onload = InitGame;

function InitGame() {
	c.font = "40px Arial";
	game.CreateMap();

	canvas.onmousedown = function() {
		game.touch = true;
	}
	canvas.onmouseup = function() {
		game.touch = false;
	};
	canvas.onclick = function() {
		if (!IsPlay) {
			IsPlay = true;
			GameTime = RunGame(Speed);
		}
	}
}

function RunGame(speed) {
	var updateTimer = setInterval(function() {

		game.CanMove();
		if (game.gameOver) {
			game.ShowOver();
			clearInterval(updateTimer);
			return;
		}
		game.ClearScreen();
		game.CheckTouch();
	}, speed);
}