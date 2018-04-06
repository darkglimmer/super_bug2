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
        game.load.atlas('breakout', './images/breakout.png', './images/breakout.json');
        game.load.image('starfield', './images/starfield.jpg');
    },
    create:function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);//开启物理引擎
        //  We check bounds collisions against all walls other than the bottom one
        game.physics.arcade.checkCollision.down = false;
        s = game.add.tileSprite(0, 0, 640, 1136, 'starfield');
        bricks = game.add.group();
        bricks.enableBody = true;
        bricks.physicsBodyType = Phaser.Physics.ARCADE;

        var brick;

        for (var y = 0; y < 4; y++){
            for (var x = 0; x < 15; x++){
                brick = bricks.create(120 + (x * 36), 100 + (y * 52), 'breakout', 'brick_' + (y+1) + '_1.png');
                brick.body.bounce.set(1);//反弹
                brick.body.immovable = true;//砖块不能动
            }
        }
        paddle = game.add.sprite(game.world.centerX, 1200, 'breakout', 'paddle_big.png');
        paddle.anchor.setTo(0.5, 0.5);//设置木板的中心点

        game.physics.enable(paddle, Phaser.Physics.ARCADE);

        paddle.body.collideWorldBounds = true;//它会与边界进行碰撞，到游戏区域边界就不会掉下去
        paddle.body.bounce.set(1);
        paddle.body.immovable = true;

        ball = game.add.sprite(game.world.centerX, paddle.y - 16, 'breakout', 'ball_1.png');
        ball.anchor.set(0.5);//指定坐标，居中.
        ball.checkWorldBounds = true;//on the Sprite to true

        game.physics.enable(ball, Phaser.Physics.ARCADE);//no collision or overlap

        ball.body.collideWorldBounds = true;//它会与边界进行碰撞，到游戏区域边界就不会掉下去
        ball.body.bounce.set(1);

        ball.animations.add('spin', [ 'ball_1.png', 'ball_2.png', 'ball_3.png', 'ball_4.png', 'ball_5.png' ], 50, true, false);

        ball.events.onOutOfBounds.add(ballLost, this);//游戏对象离开世界边界发出信号

        game.input.onDown.add(releaseBall, this);
    },
    update:function(){
        s.tilePosition.x += (game.input.speed.x / 2);

        paddle.x = game.input.x;
    
        if (paddle.x < 24)
        {
            paddle.x = 24;
        }
        else if (paddle.x > game.width - 24)
        {
            paddle.x = game.width - 24;
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
            ball.animations.play('spin');
        }    
    },
    ballLost:function(){
        lives--;
        livesText.text = 'lives: ' + lives;
    
        if (lives === 0)
        {
            gameOver();//图
        }
        else
        {
            ballOnPaddle = true;
    
            ball.reset(paddle.body.x + 16, paddle.y - 16);
            
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