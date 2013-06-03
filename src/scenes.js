var $text_css = { 'font-size': '24px', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center' };

Crafty.scene("Loading", function() {
    Crafty.e('2D, DOM, Text')
      .text('Loading...')
      .attr({ x: 0, y: Game.height/2 - 24, w: Game.width })
      .css($text_css);

    Crafty.load(['assets/192-leaves.png'], function() {
      Crafty.sprite(96, "assets/192-leaves.png", {
        spr_leaf0: [0, 0, 2, 2],
        spr_leaf_left0: [0, 0, 1, 2],
        spr_leaf_right0: [1, 0, 1, 2],
        spr_leaf1: [0, 2, 2, 2],
        spr_leaf_left1: [0, 2, 1, 2],
        spr_leaf_right1: [1, 2, 1, 2],
        spr_leaf2: [0, 4, 2, 2],
        spr_leaf_left2: [0, 4, 1, 2],
        spr_leaf_right2: [1, 4, 1, 2],
        spr_leaf3: [0, 6, 2, 2],
        spr_leaf_left3: [0, 6, 1, 2],
        spr_leaf_right3: [1, 6, 1, 2]
      });

      Crafty.scene("Game");
    });
});

Crafty.scene("Game", function() {
    Game.scoreEnt = Crafty.e("2D, DOM, Text").attr({x: 5, y: 5, w: Crafty.viewport.width, h: 50}).text("Score: 0"),
    Game.score = 0;

   Crafty.e().bind("EnterFrame", function(e) {
     var sparsity = Crafty.math.randomInt(10, 40);
     if (e.frame % sparsity == 0) {
       var leaf = Crafty.e("2D, Canvas, Leaf, Mouse");
       leaf.randomize();
     }
   });
});
