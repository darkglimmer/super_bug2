//import lives from 'block_play.js'
// class ball extends Phaser.State{
//     preload(){
//         this.game.load.image('ball', './images/ball.png');
//         this.game.load.image('brick_1', './images/tanqiu1.png');
//         this.game.load.image('brick_2', './images/tanqiu2.png');
//         this.game.load.image('brick_3', './images/tanqiu3.png');
//         this.game.load.image('brick_4', './images/tanqiu4.png');
//         this.game.load.image('go', './images/资源2.png');
//         this.game.load.image('back', './images/背景.png');
//         this.live = 3;
//     }
//     create(){
//         this.ballOnPaddle = true;
//         this.game.physics.startSystem(Phaser.Physics.ARCADE);//开启物理引擎
//         //  We check bounds collisions against all walls other than the bottom one
//         this.game.physics.arcade.checkCollision.down = false;
//         this.s = game.add.tileSprite(0, 0, 640, 1136, 'back');
//         this.bricks = this.game.add.group();
//         this.bricks.enableBody = true;
//         this.bricks.physicsBodyType = Phaser.Physics.ARCADE;

//         var brick;

//         for (var y = 0; y < 4; y++){
//             for (var x = 0; x < 9; x++){
//                 this.brick = bricks.create(64 + (x * 57), 170 + (y * 165), 'brick_' + (y+1));
//                 this.brick.body.bounce.set(1);//反弹
//                 this.brick.body.immovable = true;//砖块不能动
//             }
//         }
//         this.paddle = this.game.add.sprite(game.world.centerX, 812,'go');
//         this.paddle.anchor.setTo(0.5, 0.5);//设置木板的中心点

//         this.game.physics.enable(paddle, Phaser.Physics.ARCADE);

//         this.paddle.body.collideWorldBounds = true;//它会与边界进行碰撞，到游戏区域边界就不会掉下去
//         this.paddle.body.bounce.set(1);
//         this.paddle.body.immovable = true;

//         this.ball = this.game.add.sprite(game.world.centerX, paddle.y - 30, 'ball');
//         this.ball.anchor.set(0.5);//指定坐标，居中.
//         this.ball.checkWorldBounds = true;//on the Sprite to true

//         this.game.physics.enable(ball, Phaser.Physics.ARCADE);//no collision or overlap

//         this.ball.body.collideWorldBounds = true;//它会与边界进行碰撞，到游戏区域边界就不会掉下去
//         this.ball.body.bounce.set(1);

//         //ball.animations.add('spin', 'ball', 50, true, false);

//         this.ball.events.onOutOfBounds.add(ballLost, this);//游戏对象离开世界边界发出信号

//         this.game.input.onDown.add(releaseBall, this);
//     }
//     update(){
//         this.s.tilePosition.x += (this.game.input.speed.x / 2);

//         this.paddle.x = this.game.input.x;
    
//         if (this.paddle.x < 90)
//         {
//             this.paddle.x = 90;
//         }
//         else if (this.paddle.x > this.game.width - 90)
//         {
//             this.paddle.x = this.game.width - 90;
//         }
    
//         if (ballOnPaddle)
//         {
//             this.ball.body.x = this.paddle.x;
//         }
//         else
//         {
//             this.game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
//             this.game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
//         }    
//     }
//     releaseBall(){
//         if (ballOnPaddle)
//         {
//             this.ballOnPaddle = false;
//             this.ball.body.velocity.y = -300;
//             this.ball.body.velocity.x = -75;
//             //ball.animations.play('spin');
//         }    
//     }
//     ballLost(){
//         this.lives--;
//         this.livesText.text = 'lives: ' + lives;
//         if(lives == 0){
//             //this.game.state.start('Gameover');
//         }
//         else{
//             this.ballOnPaddle = true;
//             this.ball.reset(paddle.body.x + 30, paddle.y - 30);
//             this.ball.animations.stop();
//         }
        
//     }
//     gameOver(){
//         this.ball.body.velocity.setTo(0, 0);
//     }
//     ballHitBrick(_ball, _brick){
//        this. _brick.kill();
//         if (bricks.countLiving() == 1)
//         {
//             this.ball.body.velocity.y = 300;
//             this.ball.body.velocity.x = 75;
//             this.game.physics.arcade.collide(ball, paddle, ballHitfloor, null, this);
//             this.game.physics.arcade.collide(ball, floor, ballHitfloor, null, this);
//         }
//     }
//     ballHitPaddle(){
//         if(this.bricks.countLiving() == 1){
//             this.game.state.start("jump_load");
//         }
//         else{
//             var diff = 0;
//             if (_ball.x < _paddle.x)
//             {
//                 //  Ball is on the left-hand side of the paddle
//                 this.diff = _paddle.x - _ball.x;
//                 this._ball.body.velocity.x = (-10 * diff);
//             }
//             else if (_ball.x > _paddle.x)
//             {
//                 //  Ball is on the right-hand side of the paddle
//                 this.diff = _ball.x -_paddle.x;
//                 this._ball.body.velocity.x = (10 * diff);
//             }
//             else
//             {
//                 //  Ball is perfectly in the middle
//                 //  Add a little random X to stop it bouncing straight up!
//                this._ball.body.velocity.x = 2 + Math.random() * 8;
//             }
//         }
//     }
//     ballHitfloor(){
//         this.game.state.start("jump_load");
//     }
// };


//  export default ball;
// export default lives;
import lives from 'block_play.js'
var ball = function(){
    var ball;
    var paddle;//木板
    var bricks;//砖块

    var ballOnPaddle = true;
    var s;
};
ball.prototype = {
    preload:function(){
        game.load.image('ball', './images/ball.png');
        game.load.image('brick_1', './images/tanqiu1.png');
        game.load.image('brick_2', './images/tanqiu2.png');
        game.load.image('brick_3', './images/tanqiu3.png');
        game.load.image('brick_4', './images/tanqiu4.png');
        game.load.image('go', './images/左行0.png');
        game.load.image('back', './images/背景.png');
    },
    create:function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);//开启物理引擎
        //  We check bounds collisions against all walls other than the bottom one
        game.physics.arcade.checkCollision.down = false;
        s = game.add.tileSprite(0, 0, 640, 1136, 'back');
        bricks = game.add.group();
        bricks.enableBody = true;
        bricks.physicsBodyType = Phaser.Physics.ARCADE;

        var brick;

        for (var y = 0; y < 4; y++){
            for (var x = 0; x < 9; x++){
                brick = bricks.create(64 + (x * 57), 170 + (y * 165), 'brick_' + (y+1));
                brick.body.bounce.set(1);//反弹
                brick.body.immovable = true;//砖块不能动
            }
        }
        paddle = game.add.sprite(game.world.centerX, 812,'go');
        paddle.anchor.setTo(0.5, 0.5);//设置木板的中心点

        game.physics.enable(paddle, Phaser.Physics.ARCADE);

        paddle.body.collideWorldBounds = true;//它会与边界进行碰撞，到游戏区域边界就不会掉下去
        paddle.body.bounce.set(1);
        paddle.body.immovable = true;

        ball = game.add.sprite(game.world.centerX, paddle.y - 30, 'ball');
        ball.anchor.set(0.5);//指定坐标，居中.
        ball.checkWorldBounds = true;//on the Sprite to true

        game.physics.enable(ball, Phaser.Physics.ARCADE);//no collision or overlap

        ball.body.collideWorldBounds = true;//它会与边界进行碰撞，到游戏区域边界就不会掉下去
        ball.body.bounce.set(1);

        //ball.animations.add('spin', 'ball', 50, true, false);

        ball.events.onOutOfBounds.add(ballLost, this);//游戏对象离开世界边界发出信号

        game.input.onDown.add(releaseBall, this);
    },
    update:function(){
        s.tilePosition.x += (game.input.speed.x / 2);

        paddle.x = game.input.x;
    
        if (paddle.x < 90)
        {
            paddle.x = 90;
        }
        else if (paddle.x > game.width - 90)
        {
            paddle.x = game.width - 90;
        }
    
        if (ballOnPaddle)
        {
            ball.body.x = paddle.x;
        }
        else
        {
            game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
            game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
        }    
    },
    releaseBall:function(){
        if (ballOnPaddle)
        {
            ballOnPaddle = false;
            ball.body.velocity.y = -300;
            ball.body.velocity.x = -75;
            //ball.animations.play('spin');
        }    
    },
    ballLost:function(){
        lives--;
        livesText.text = 'lives: ' + lives;
        if(lives == 0){
            game.state.start('Gameover');
        }
        else{
            ballOnPaddle = true;
    
            ball.reset(paddle.body.x + 30, paddle.y - 30);
            
            ball.animations.stop();
        }
        
    },
    gameOver:function(){
        ball.body.velocity.setTo(0, 0);
    },
    ballHitBrick:function(_ball, _brick){
        _brick.kill();
        if (bricks.countLiving() == 1)
        {
            ball.body.velocity.y = 300;
            ball.body.velocity.x = 75;
            game.physics.arcade.collide(ball, paddle, ballHitfloor, null, this);
            game.physics.arcade.collide(ball, floor, ballHitfloor, null, this);
        }
    },
    ballHitPaddle:function(){
        if(bricks.countLiving() == 1){
            game.state.start("jump_load");
        }
        else{
            var diff = 0;
            if (_ball.x < _paddle.x)
            {
                //  Ball is on the left-hand side of the paddle
                diff = _paddle.x - _ball.x;
                _ball.body.velocity.x = (-10 * diff);
            }
            else if (_ball.x > _paddle.x)
            {
                //  Ball is on the right-hand side of the paddle
                diff = _ball.x -_paddle.x;
                _ball.body.velocity.x = (10 * diff);
            }
            else
            {
                //  Ball is perfectly in the middle
                //  Add a little random X to stop it bouncing straight up!
                _ball.body.velocity.x = 2 + Math.random() * 8;
            }
        }
    },
    ballHitfloor:function(){
        game.state.start("jump_load");
    }
};

export default ball;
export default lives;