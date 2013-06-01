var gravityConst = 0.2;
var gravityConstHit = 2;
var Game = {
  start: function() {
    Crafty.init(550, 440);
  
    /*
  	Crafty.sprite(64, "images/fruit.png", {
  		banana: [0,0],
  		apple: [1,0],
  		watermelon: [2,0],
  		orange: [3,0],
  		coconut: [4,0],
  		lemon: [5,0]
  	});
    */
  
    Crafty.background("#1B8EE0");
  
  	var scoreEnt = Crafty.e("2D, DOM, Text").attr({x: 5, y: 5, w: Crafty.viewport.width, h: 50}).text("Score: 0"),
  		score = 0;
  
  	Crafty.c("Leaf", {
  		_colors: ["#fff", "#f00", "#0f0", "#f99", "#00f", "#9f9"],
  		_xspeed: 0,
  		_yspeed: 0,
  
  		init: function() {
  			var index = Crafty.math.randomInt(0, 5);
  
        this.addComponent("2D, Color, Mouse");
        this.w = 48;
        this.h = 48;
        this.color(this._colors[index]);
  			this.y = Crafty.math.randomInt(0, Crafty.viewport.height);
  			this.z = 1;
        // this.gravityConst(0);
  
				this.x = 0;
				this._xspeed = Crafty.math.randomInt(3, 5);
        this._yspeed = Crafty.math.randomInt(0, 2);
        this._amp = Crafty.math.randomInt(3, 8);
        this._freq = Crafty.math.randomInt(50, 80);
  
  			this.bind("EnterFrame", function() {
  				this.x += this._xspeed;
          
          if (!this.hit) {
            this.y += this._amp * Math.cos(this.x/this._freq);
          }
  
  				if (this._x > Crafty.viewport.width || (this._y > Crafty.viewport.height && this.hit)) {
  					this.destroy();
  					if(!this.hit) {
  						score -= (index+1) * 10;
  						scoreEnt.text("Score: "+score);
  					}
  				}
  			});
  
  			this.bind("MouseOver", function() {
  				this.hit = true;
          this.color("brown");
          this._xspeed = 0;
          this.addComponent("Gravity").gravity();
          this.gravityConst(gravityConstHit);
  				score += (index+1) * 10;
  				scoreEnt.text("Score: "+score);
  
  				this.unbind("MouseOver");
  			});
  		}
  	});
  
  	Crafty.e().bind("EnterFrame", function(e) {
  		var sparsity = Crafty.math.randomInt(10, 50);
  		if(e.frame % sparsity == 0) {
  			Crafty.e("2D, DOM, Leaf, Mouse");
  		}
  	});
  }
};