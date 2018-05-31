var width,height;
function playball_1(game){
    var ball;
    var paddle;//木板
    var bricks;//砖块
    var wall_l;
    var wall_r;
    var bgm
    var ballOnPaddle = true;
    var s;
    var groundSound;
    this.init = function(){
        groundSound = game.add.sound('hit');
        curgame = 3;
    }
    this.create = function () {

        bgm= game.add.sound('bgm',1,true);

        game.physics.startSystem(Phaser.Physics.ARCADE);//开启物理引擎
        game.physics.arcade.checkCollision.down = false;

        wall_l = game.add.sprite(0,0,'wallleft');
        wall_l.scale.x = window.innerWidth/640;
        wall_l.scale.y = window.innerHeight/800;
        game.physics.enable(wall_l, Phaser.Physics.ARCADE);
        wall_l.body.bounce.set(1);//反弹
        wall_l.body.immovable = true;

        wall_r = game.add.sprite(window.innerWidth - 70,0,'wallright');
        wall_r.scale.x = window.innerWidth/640;
        wall_r.scale.y = window.innerHeight/800;
        game.physics.enable(wall_r, Phaser.Physics.ARCADE);
        wall_r.body.bounce.set(1);//反弹
        wall_r.body.immovable = true;

        bgImage = game.add.image(0,0,'back');
        bgImage.scale.x = window.innerWidth/640;
        bgImage.scale.y = window.innerHeight/800;

        bricks = game.add.group();
        bricks.enableBody = true;
        bricks.physicsBodyType = Phaser.Physics.ARCADE;

        var brick;

        for (var y = 0; y < 7; y++){
            for (var x = 0; x < 7; x++){
                if(y < 4){
                    brick = bricks.create(75 + (x * 120), 180 + (y * 100), 'brick_' + (y+1));
                }
                else{
                    brick = bricks.create(75 + (x * 120), 180 + (y * 100), 'brick_' + (y-3));
                }
                brick.scale.x = window.innerWidth/1000;
                brick.scale.y = window.innerHeight/2000;
                brick.body.bounce.set(1);//反弹
                brick.body.immovable = true;//砖块不能动
            }
        }
        paddle = game.add.sprite(game.world.centerX, 1410,'go');
        paddle.scale.x = window.innerWidth/640;
        paddle.scale.y = window.innerHeight/1136;
        paddle.anchor.setTo(0.5, 0.5);//设置木板的中心点
        game.physics.enable(paddle, Phaser.Physics.ARCADE);
        paddle.body.collideWorldBounds = true;//它会与边界进行碰撞，到游戏区域边界就不会掉下去
        paddle.body.bounce.set(1);
        paddle.body.immovable = true;


        var tmp = game.add.sprite(73, 0,'person');
        tmp.scale.x = window.innerWidth/640;
        tmp.scale.y = window.innerHeight/1136;
        var tween = game.add.tween(tmp).to({y: 880*(window.innerHeight/1136)}, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(plankdown,this);
        paddle.alpha = 0;

        function plankdown(){
            var tmp2 = game.add.sprite(73, 0,'plank');
            tmp2.scale.x = window.innerWidth/640;
            tmp2.scale.y = window.innerHeight/1136;
            var tween2 = game.add.tween(tmp2).to({y: 880*(window.innerHeight/1136)}, 1000, Phaser.Easing.Linear.None, true);
            tween2.onComplete.add(killtmp,this);
            function killtmp(){
                tmp.kill();
                tmp2.kill();
                paddle.alpha = 1;  
            }
        }


        ball = game.add.sprite(73, paddle.y - 180, 'ball');
        ball.scale.x = window.innerWidth/1300;
        ball.scale.y = window.innerHeight/1650;
        ball.anchor.set(0.5);//指定坐标，居中.
        ball.checkWorldBounds = true;
        game.physics.enable(ball, Phaser.Physics.ARCADE);
        
        game.input.onDown.add(releaseBall, this);
        function releaseBall () {
            if (ballOnPaddle)
            {
                ballOnPaddle = false;
                ball.body.velocity.y = -500;
                ball.body.velocity.x = -180;
            }
        }
        ball.body.collideWorldBounds = true;//它会与边界进行碰撞，到游戏区域边界就不会掉下去
        ball.body.bounce.set(1);
    },
    this.update = function () {
        
        // ballHitPaddle
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
            game.physics.arcade.collide(ball, wall_l, ballHitwall, null, this);
            game.physics.arcade.collide(ball, wall_r, ballHitwall, null, this);
        }

        if(ball.body.y > 1500){
            game.state.start('gameover');
        }
        function ballHitwall(_ball,_wall){
            groundSound.play();
        }
        function ballHitPaddle(_ball,_paddle){
            groundSound.play();
            var diff = 0;
            if (_ball.x < _paddle.x)
            {
                diff = _paddle.x - _ball.x;
                _ball.body.velocity.x = (-5 * diff);
            }
            else if (_ball.x > _paddle.x)
            {
                diff =  _ball.x -_paddle.x;
                _ball.body.velocity.x = (5 * diff);
            }
            else
            {
                _ball.body.velocity.x = 2 + Math.random() * 8;
            }
            if (bricks.countLiving() < 40 ){
                game.state.start('playball_2');
            }
        }
        function ballHitBrick(_ball,_brick){
            groundSound.play();
            _brick.kill();
        }
    }

}
