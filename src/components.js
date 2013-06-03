Crafty.c("Leaf", {
  xspeed: 0,
  yspeed: 0,
  init: function() {
    this.w = 100;
    this.h = 100;
    this.x = -100;
    this.y = 0;
    this.z = 1;
    this.pointValue = 10;

    this.lastRotChange = Date.now();
    this.bind("EnterFrame", this.onEnterFrame);
    this.bind("MouseOver", this.onMouseOver);
  },
  flow: function(x) {
    return this.amp * Math.cos(x/this.freq);
  },
  randomize: function() {
    this.seed = Crafty.math.randomInt(0, 5);
    this.addComponent("spr_leaf"+this.seed);
    this.w = 100;
    this.h = 100;
    this.origin("center");
    this.y = Crafty.math.randomInt(0, Crafty.viewport.height - this.h);
    this.pointValue = (this.seed+1) * 10;
    this.xspeed = Crafty.math.randomInt(2, 4);
    this.yspeed = Crafty.math.randomInt(0, 2);
    this.amp = Crafty.math.randomInt(1.5, 5);
    this.freq = Crafty.math.randomInt(40, 60);
    this.lastRotChange = Date.now();
    this.rotDir = 1;
    this.rotSpeed = Crafty.math.randomInt(1, 5);
  },
  clip: function(source, side) {
    this.hit = true;
    this.seed = source.seed;
    this.addComponent("spr_leaf_"+side+this.seed);
    this.w = source.w/2;
    this.h = source.h;
    this.y = source.y;
    var xspeed = Crafty.math.randomInt(0, 12);
    if (side === 'right') {
      this.x = source.x + source.w/2;
      this.xspeed = source.xspeed + xspeed;
    } else {
      this.x = source.x;
      this.xspeed = source.xspeed - xspeed;
    }
    this.origin("center");
    this.pointValue = source.pointValue;
    this.lastRotChange = source.lastRotChange;
    this.rotation = source.rotation;
    if (side === 'right') {
      this.rotDir = Math.abs(source.rotDir);
      this.rotSpeed = source.rotSpeed;
    } else {
      this.rotDir = -1 * Math.abs(source.rotDir);
      this.rotSpeed = source.rotSpeed;
    }
    this.addComponent("Gravity").gravity();
    this.gravityConst(2);
    this.unbind("MouseOver");
  },
  onEnterFrame: function() {
    this.x += this.xspeed;
    if (!this.hit) {
      this.y += this.flow(this.x);

      var rotAmt = this.rotSpeed;
      var timeSinceLastRot = Date.now() - this.lastRotChange;
      if (timeSinceLastRot > 1000) {
        if (Crafty.math.randomInt(0, 100) > 80) {
          this.rotDir *= -1;
          rotAmt *= 0.01;
        }
        // Only roll for rotation change once per interval
        this.lastRotChange = Date.now();
      } else if (timeSinceLastRot < 100) {
        rotAmt *= 0.01 * timeSinceLastRot;
      }
      this.rotation += this.rotDir * rotAmt;
    } else {
      this.rotation += this.rotDir * this.rotSpeed;
    }

    if (this.x > Crafty.viewport.width || (this.hit && this.y > Crafty.viewport.height)) {
        this.destroy();
    }

    Game.scoreEnt.text("Score: "+Game.score);
  },
  onMouseOver: function() {
    this.hit = true;
    this.rotSpeed *= 14/this.rotSpeed;
    Game.score += this.pointValue;

    var left = Crafty.e("2D, Canvas, Leaf, Mouse").clip(this, 'left');
    var right = Crafty.e("2D, Canvas, Leaf, Mouse").clip(this, 'right');
    this.destroy();
  }
});
