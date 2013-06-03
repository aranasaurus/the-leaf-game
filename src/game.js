//var gravityConst = 0.2;
//var gravityConstHit = 2;
var Game = {
  start: function() {
    this.width = 800;
    this.height = 550;
    this.score = 0;
    Crafty.init(this.width, this.height);

    Crafty.background("#1B8EE0");

    Crafty.scene("Loading");
    Crafty.e().bind("EnterFrame", function(e) {
      var sparsity = Crafty.math.randomInt(10, 50);
      if(e.frame % sparsity == 0) {
        Crafty.e("2D, Canvas, Leaf, Mouse");
      }
    });
  }
};
