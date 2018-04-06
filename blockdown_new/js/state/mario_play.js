var width,height;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
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
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 100;
        game.add.image(0,0,'background1');
        player = game.add.sprite(0,height- 100,'walk');
        player.scale.set(0.5);
        player.collideWorldBounds = true;
        game.physics.arcade.enable(player,false);
        player.body.bounce.y = 0.2;
        game.physics.arcade.enable(player,false);
        game.time.desiredFps = 30;

        // player.animations.add('walkR',[1,2,3,4]);
        
        platform = game.add.group();
        platform.enableBody=true;
        platform.physicsBodyType=Phaser.Physics.ARCADE;
        for (var i = 0; i < width; i++){
            if(i <= 200 || i >= 390){
            var land = platform.create(i,height-30,'land2');
            land.body.collideWorldBounds = true;
            }
        }
            
        // }
        var pipe = game.add.sprite(260,height-65,'pipe');
        pipe.scale.set(0.7);

        player.body.bounce.y = 0.2;
        player.body.collideWorldBounds = true;
        player.animations.add('right',[0,1,2,3,4,5,],10,true);
        player.animations.add('left',[6,7,8,9,10,11],10,true);
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    


        // //         //按键
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
        //                     // var aniR  = game.add.tween(player.body);
        //                     // var curx = player.body.x;
        //                     // aniR.to({x: curx - 80,},450,null);
        //                     // aniR.start();
        //                     // player.animations.play('walkR',1,false);
        //                     player.body.velocity.x = -80;
        //                     break;
        //                 case Phaser.Keyboard.RIGHT:
        //                     // btnSound.play();
        //                     // var aniR  = game.add.tween(player.body);
        //                     // var curx = player.body.x;
        //                     // player.animations.play('walkR',80,false);
        //                     // aniR.to({x: curx + 80,},600,null);
        //                     // aniR.start();
                            
        //                     //  aniR.onComplete.add(player.animations.stop(),this);


        //                     player.body.velocity.x = 80;
        //                     break;
        //                 case Phaser.Keyboard.UP:
        //                     // btnSound.play();
        //                     player.body.velocity.y = -80;
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
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;
    
            if (facing != 'left')
            {
                player.animations.play('left');
                facing = 'left';
            }
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;
    
            if (facing != 'right')
            {
                player.animations.play('right');
                facing = 'right';
            }
        }
        else
        {
            if (facing != 'idle')
            {
                player.animations.stop();
    
                if (facing == 'left')
                {
                    player.frame = 0;
                }
                else
                {
                    player.frame = 5;
                }
    
                facing = 'idle';
            }
        }
        game.physics.arcade.collide(player, platform);
        // console.log(player.body.y);
        if (jumpButton.isDown && player.body.y > 472 &&game.time.now > jumpTimer)
        {
            player.body.velocity.y = -150;
            jumpTimer = game.time.now + 750;
        }

        // if(player.body.x == 320 && player.body.y <= height - 30){
        //     // player.body.velocity.y = 100;
        //     console.log("?");
        // }

        function next(){
            if(player.body.x >=  250 && player.body.y < height - 100){
                // console.log("?")
                
                game.state.start('load');//next
            }
        }
        next();

       
    }
    this.render = function () {

        // game.debug.text(game.time.suggestedFps, 32, 32);
    
        // game.debug.text(game.time.physicsElapsed, 32, 32);
        // game.debug.body(player);
        // game.debug.bodyInfo(player, 16, 24);
    
    }
   
}