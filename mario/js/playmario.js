var width,height;
function playMario(game){
    var layer;
    var player;
    var platform,gameOver=false;
    var gameOverText;
    var keys;
    var xNumber,yNumber;
    var groundSound;
    this.init = function(){
        //获取当前可用分辨率
        if(!isPc){
            game.width = Math.floor(window.innerWidth/16)*16;
            game.height = Math.floor(window.innerHeight/16)*16;
        }

        height = game.height;
        width = game.width;
    }
    this.create = function () {
        // game.physics.startSystem(Phaser.Physics.P2JS);
        // game.physics.p2.gravity.y=200;
        // game.add.image(0,0,'background1');
        // player = game.add.sprite(50,height- 90,'marioR');
        // player.scale.set(0.5);
        // game.physics.p2.enable(player,false);

        // player.animations.add('walkR',[1,2,3,4]);
        
        // platform = game.add.group();
        // platform.enableBody=true;
        // platform.physicsBodyType=Phaser.Physics.P2JS;
        // for (var i = 0; i < width; i++){
        //     if(i <= 250 || i >= 390){
        //     var land = platform.create(i,height-30,'land2');
        //     land.body.kinematic = true;    
        //     }
            
        // }
        // var pipe = game.add.sprite(280,height-54,'pipe');
        // pipe.scale.set(0.7);

        //         //按键
        //     keys = game.input.keyboard.addKeys({ left: Phaser.Keyboard.LEFT, right: Phaser.Keyboard.RIGHT, up: Phaser.Keyboard.UP,down:Phaser.Keyboard.DOWN,spin: Phaser.Keyboard.SPACEBAR });
        //     keys.left.onDown.add(keyDown,this);
        //     keys.right.onDown.add(keyDown,this);
        //     keys.up.onDown.add(keyDown,this);
        //     keys.spin.onDown.add(keyDown,this);
        //     keys.down.onDown.add(keyDown,this);
        //     function keyDown(key){
        //         if(!gameOver){
        //             switch (key.keyCode){
        //                 case Phaser.Keyboard.LEFT:
        //                     // btnSound.play();
        //                     var aniR  = game.add.tween(player.body);
        //                     var curx = player.body.x;
        //                     aniR.to({x: curx - 80,},450,null);
        //                     aniR.start();
        //                     player.animations.play('walkR',1,false);
        //                     break;
        //                 case Phaser.Keyboard.RIGHT:
        //                     // btnSound.play();
        //                     var aniR  = game.add.tween(player.body);
        //                     var curx = player.body.x;
        //                     player.animations.play('walkR',80,false);
        //                     aniR.to({x: curx + 80,},600,null);
        //                     aniR.start();
                            
        //                      aniR.onComplete.add(player.animations.stop(),this);


        //                     // player.body.velocity.x = 80;
        //                     break;
        //                 case Phaser.Keyboard.UP:
        //                     // btnSound.play();
        //                     player.body.velocity.y = -50;
        //                     break;
        //                 case Phaser.Keyboard.DOWN:
        //                     // btnSound.play();
        //                     player.body.velocity.y += 30;

        //                     break;
        //                 case Phaser.Keyboard.SPACEBAR:
        //                     // btnSound.play();
        //                     player.body.angle = player.body.angle + 90;
        //                     break;
        //             }
        //         }
        //     }

    }
    this.update = function () {
        if(player.body.x == 320 && player.body.y <= height - 30){
            // player.body.velocity.y = 100;
            console.log("?");
        }
       
    }
   
}