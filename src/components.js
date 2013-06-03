Crafty.c("Leaf", {
  xspeed: 0,
  yspeed: 0,
  init: function() {
    this.w = 110;
    this.h = 110;
    this.x = 0;
    this.y = 0;
    this.z = 1;
    this.pointValue = 10;

    this.lastRotChange = Date.now();
  },
  flow: function(x) {
    return this.amp * Math.cos(x/this.freq);
  },
  randomize: function() {
    this.seed = Crafty.math.randomInt(0, 5);
    this.addComponent("spr_leaf"+this.seed);
    this.w = 110;
    this.h = 110;
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
  notSoRandomize: function(that) {
    this.seed = that.seed;
    this.addComponent("spr_leaf_right"+this.seed);
    this.origin("center");
    this.y = that.y;
    this.pointValue = that.pointValue;
    this.xspeed = that.xspeed;
    this.yspeed = that.yspeed;
    this.amp = that.amp;
    this.freq = that.freq;
    this.lastRotChange = that.lastRotChange;
    this.rotDir = -that.rotDir;
    this.rotSpeed = -that.rotSpeed;
  },
  onEnterFrame: function() {
    this.x += this.xspeed;
    if (!this.hit) {
      this.y += this.flow(this.x);
    }

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
    this.rotation += this.rotDir * this.rotSpeed;

    if (this.x > Crafty.viewport.width || (this.hit && this.y > Crafty.viewport.height)) {
        this.destroy();
    }

    Game.scoreEnt.text("Score: "+Game.score);
  },
  onMouseOver: function() {
    this.hit = true;
    this.xspeed = 0;
    this.addComponent("Gravity").gravity();
    this.gravityConst(2);
    this.rotSpeed *= -14/this.rotSpeed;
    Game.score += this.pointValue;
    this.unbind("MouseOver");
  }
});
