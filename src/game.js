var gravityConst = 0.2;
var gravityConstHit = 2;
var Game = {
  start: function() {
    Crafty.init(550, 440);
  
  	Crafty.sprite(128, "assets/128xleaves.png", {
  		spr_leaf0: [0,0],
  		spr_leaf1: [0,1],
  		spr_leaf2: [0,2],
  		spr_leaf3: [0,3]
  	});
  
    Crafty.background("#1B8EE0");
  
  	var scoreEnt = Crafty.e("2D, DOM, Text").attr({x: 5, y: 5, w: Crafty.viewport.width, h: 50}).text("Score: 0"),
  		score = 0;
  
  	Crafty.c("Leaf", {
  		_xspeed: 0,
  		_yspeed: 0,
  
  		init: function() {
  			var index = Crafty.math.randomInt(0, 5);
  
        this.addComponent("spr_leaf"+index);
        this.w = 64;
        this.h = 64;
  			this.y = Crafty.math.randomInt(0, Crafty.viewport.height);
  			this.z = 1;
        this.origin("center");
        // this.gravityConst(0);
  
				this.x = 0;
				this._xspeed = Crafty.math.randomInt(2, 4);
        this._yspeed = Crafty.math.randomInt(0, 2);
        this._amp = Crafty.math.randomInt(3, 6);
        this._freq = Crafty.math.randomInt(50, 80);
        this._lastRotChange = Date.now();
        this._rotDir = 1;
        this._rotSpeed = Crafty.math.randomInt(1,7);
  
  			this.bind("EnterFrame", function() {
  				this.x += this._xspeed;
          if (!this.hit) {
            this.y += this._amp * Math.cos(this.x/this._freq);
          }
          
          var rotAmt = this._rotSpeed;
          var timeSinceLastRot = Date.now() - this._lastRotChange;
          if (timeSinceLastRot > 1000) {
            if (Crafty.math.randomInt(0,100) > 80) {
              this._rotDir *= -1;
              rotAmt *= 0.01;
            }
            // Only roll for rotation change 1 time per interval
            this._lastRotChange = Date.now();
          } else if (timeSinceLastRot < 100) {
            rotAmt *= 0.01 * timeSinceLastRot;
          }
          this.rotation += this._rotDir * this._rotSpeed;
  
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
          this._xspeed = 0;
          this.addComponent("Gravity").gravity();
          this.gravityConst(gravityConstHit);
          this._rotSpeed *= -14/this._rotSpeed;
  				score += (index+1) * 10;
  				scoreEnt.text("Score: "+score);
  
  				this.unbind("MouseOver");
  			});
  		}
  	});
  
  	Crafty.e().bind("EnterFrame", function(e) {
  		var sparsity = Crafty.math.randomInt(10, 50);
  		if(e.frame % sparsity == 0) {
  			Crafty.e("2D, Canvas, Leaf, Mouse");
  		}
  	});
  }
};