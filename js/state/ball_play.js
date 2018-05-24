var width,height;
var gameOver = false;
function playball(game){
    var ball;
    var paddle;//木板
    var bricks;//砖块
    var wall_l;
    var wall_r;

    var ballOnPaddle = true;
    var s;
    var groundSound;
    this.init = function(){
        //获取当前可用分辨率
        if(!isPc){
            game.width = Math.floor(window.innerWidth/16)*16;
            game.height = Math.floor(window.innerHeight/16)*16;
        }
        groundSound = game.add.sound('hit');

        height = game.height;
        width = game.width;
    }
    this.create = function () {
        // var tmp = game.add.sprite(73, 0,'person');
        // tmp.scale.set(0.7);
        // var tween = game.add.tween(tmp).to({y: 705}, 1000, Phaser.Easing.Linear.None, true);
        // tween.onComplete.add(killtmp,this);
        // function killtmp(){
        //     tmp.kill();
        //     paddle.alpha = 1;   
        // }
        // paddle.alpha = 0;
        
        game.physics.startSystem(Phaser.Physics.ARCADE);//开启物理引擎
        game.physics.arcade.checkCollision.down = false;

        wall_l = game.add.sprite(0,0,'wallleft');
        wall_l.scale.y = window.innerHeight/916;
        game.physics.enable(wall_l, Phaser.Physics.ARCADE);
        wall_l.body.bounce.set(1);//反弹
        wall_l.body.immovable = true;
        wall_l.alpha = 0;

        wall_r = game.add.sprite(595,0,'wallright');
        wall_r.scale.y = window.innerHeight/916;
        game.physics.enable(wall_r, Phaser.Physics.ARCADE);
        wall_r.body.bounce.set(1);//反弹
        wall_r.body.immovable = true;
        wall_r.alpha = 0;

        bgImage = game.add.image(0,0,'back');
        bgImage.scale.y = window.innerHeight/916;

        bricks = game.add.group();
        bricks.enableBody = true;
        bricks.physicsBodyType = Phaser.Physics.ARCADE;

        var brick;

        for (var y = 0; y < 4; y++){
            for (var x = 0; x < 9; x++){
                brick = bricks.create(64 + (x * 57), 150 + (y * 100), 'brick_' + (y+1));
                brick.scale.set(0.5);
                brick.body.bounce.set(1);//反弹
                brick.body.immovable = true;//砖块不能动
            }
        }
        paddle = game.add.sprite(game.world.centerX, 900,'go');
        paddle.anchor.setTo(0.5, 0.5);//设置木板的中心点
        game.physics.enable(paddle, Phaser.Physics.ARCADE);
        paddle.body.collideWorldBounds = true;//它会与边界进行碰撞，到游戏区域边界就不会掉下去
        paddle.body.bounce.set(1);
        paddle.scale.set(0.7);
        paddle.body.immovable = true;

        ball = game.add.sprite(game.world.centerX, paddle.y - 60, 'ball');
        ball.scale.set(0.5)
        ball.anchor.set(0.5);//指定坐标，居中.
        ball.checkWorldBounds = true;


        game.physics.enable(ball, Phaser.Physics.ARCADE);

        if (ballOnPaddle)
        {
            ballOnPaddle = false;
            ball.body.velocity.y = -400;
            ball.body.velocity.x = -90;
        }    
        ball.body.collideWorldBounds = true;//它会与边界进行碰撞，到游戏区域边界就不会掉下去
        ball.body.bounce.set(1);
    },
    this.update = function () {
        // s.tilePosition.x += (game.input.speed.x / 2);
        
        ballHitPaddle
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

        if(ball.body.y > 920){
            gameOver = true;
        }
        
        if(gameOver){
            ball.body.velocity.setTo(0, 0);
            ball.body.velocity.y = 0;
            ball.body.velocity.x = 0;
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
            if (bricks.countLiving() < 30 )
            {
                //ball.body.velocity.y = 300;
                //ball.body.velocity.x = 75;
                // flashview.beginFill(0xFFFFFF);
                // flashview.drawRect(0, 0, flash.width, flash.height);
        
                // var flashtween = game.add.tween(flashview).from({ alpha: 0 }, 500, Phaser.Easing.Linear.None, false, 0, 1, true);
                // flashtween.start();
                game.state.start("loadjump");
            }
        }

        
        function ballHitfloor(){
            game.state.start("");//gif
        } 
        function ballHitBrick(_ball,_brick){
            groundSound.play();
            _brick.kill();
        }
    }

}
