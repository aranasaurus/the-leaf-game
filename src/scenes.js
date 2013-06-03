var $text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' };

Crafty.scene("Loading", function() {
    Crafty.e('2D, DOM, Text')
      .text('Loading...')
      .attr({ x: 0, y: Game.height/2 - 24, w: Game.width })
      .css($text_css);

    Crafty.load(['assets/192-leaves.png'], function() {
      Crafty.sprite(192, "assets/192-leaves.png", {
        spr_leaf0: [0, 0],
        spr_leaf_left0: [0, 0, 96, 192],
        spr_leaf_right0: [96, 0, 96, 192],
        spr_leaf1: [0, 1],
        spr_leaf_left1: [0, 192, 96, 192],
        spr_leaf_right1: [96, 192, 96, 192],
        spr_leaf2: [0,2],
        spr_leaf_left2: [0, 384, 96, 192],
        spr_leaf_right2: [96, 384, 96, 192],
        spr_leaf3: [0,3],
        spr_leaf_left2: [0, 576, 96, 192],
        spr_leaf_right2: [96, 576, 96, 192]
      });

      Crafty.scene("Game");
    });
});

Crafty.scene("Game", function() {
    Game.scoreEnt = Crafty.e("2D, DOM, Text").attr({x: 5, y: 5, w: Crafty.viewport.width, h: 50}).text("Score: 0"),
    Game.score = 0;

   Crafty.e().bind("EnterFrame", function(e) {
     var sparsity = Crafty.math.randomInt(10, 50);
     if (e.frame % sparsity == 0) {
       var leaf = Crafty.e("2D, Canvas, Leaf, Mouse");
       leaf.randomize();
       leaf.bind("EnterFrame", leaf.onEnterFrame);
       leaf.bind("MouseOver", leaf.onMouseOver);
     }
   });
});
