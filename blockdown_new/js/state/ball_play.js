var width,height;
function playball(game){
    var ball;
    var paddle;//木板
    var bricks;//砖块

    var ballOnPaddle = true;
    var s;
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
        game.physics.startSystem(Phaser.Physics.ARCADE);//开启物理引擎
        game.physics.arcade.checkCollision.down = false;
        game.add.image(0,0,'back');
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
        paddle = game.add.sprite(game.world.centerX, 618,'go');
        paddle.anchor.setTo(0.5, 0.5);//设置木板的中心点

        game.physics.enable(paddle, Phaser.Physics.ARCADE);

        paddle.body.collideWorldBounds = true;//它会与边界进行碰撞，到游戏区域边界就不会掉下去
        paddle.body.bounce.set(1);
        paddle.body.immovable = true;

        ball = game.add.sprite(game.world.centerX, paddle.y - 30, 'ball');
        ball.anchor.set(0.5);//指定坐标，居中.
        ball.checkWorldBounds = true;

        game.physics.enable(ball, Phaser.Physics.ARCADE);

        ball.body.collideWorldBounds = true;//它会与边界进行碰撞，到游戏区域边界就不会掉下去
        ball.body.bounce.set(1);
        ball.events.onOutOfBounds.add(ballLost, this);//游戏对象离开世界边界发出信号
        game.input.onDown.add(releaseBall, this);
    },
    this.update = function () {
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
    this.releaseBall = function () {
        if (ballOnPaddle)
        {
            ballOnPaddle = false;
            ball.body.velocity.y = -300;
            ball.body.velocity.x = -75;
            //ball.animations.play('spin');
        }    
    },
    this.ballLost = function (){
        // lives--;
        // livesText.text = 'lives: ' + lives;
        // if(lives == 0){
        //     game.state.start('Gameover');
        // }
        // else{
            ballOnPaddle = true;
    
            ball.reset(paddle.body.x + 30, paddle.y - 30);
            
            //ball.animations.stop();
        //}
        
    },
    this.gameOver = function (){
        ball.body.velocity.setTo(0, 0);
    },
    this.ballHitBrick = function (_ball, _brick){
        _brick.kill();
        if (bricks.countLiving() == 1)
        {
            ball.body.velocity.y = 300;
            ball.body.velocity.x = 75;
            game.physics.arcade.collide(ball, paddle, ballHitfloor, null, this);
            game.physics.arcade.collide(ball, floor, ballHitfloor, null, this);
        }
    },
    this.ballHitPaddle = function (){
        if(bricks.countLiving() == 1){
            game.state.start("");
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
    this.ballHitfloor = function(){
        game.state.start("");
    }
};
