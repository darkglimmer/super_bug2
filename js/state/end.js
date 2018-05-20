function ending(game){
    var map;
    var layer;
    var player;
    var bug;
    var facing = 'right';
    // var jumpTimer = 0;
    var cursors;
    var jumpButton;
    this.init = function(){
        game.scale.pageAlignHorizontally=true;//水平居中
    }
    this.preload = function(){
        game.load.tilemap('mario', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/img/map2.png');
        game.load.spritesheet('walk','assets/img/walk.png',120,120);
        game.load.image('pipe','assets/img/pipe.png');

    }
    this.create = function(){
        //添加物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // 添加地图
        map = game.add.tilemap('mario');
    
        map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
    
        layer = map.createLayer('World1');
        layer.setScale(1.5);//放大了瓦片地图，注意坐标都要改变了
        layer.resizeWorld();
        // to see the collision tiles
        // layer.debug = true;

        map.setCollisionBetween(13, 17);
        map.setCollisionBetween(20, 25);
        map.setCollisionBetween(27, 29);
        map.setCollision(40);


        // 添加玩家
        player = game.add.sprite(10, 1400,'walk');
        player.scale.set(0.7);
        game.physics.arcade.enable(player,false);
        player.collideWorldBounds = true;
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 200;
        game.time.desiredFps = 30;
        

        player.animations.add('walkR',[1,2,3,4]);
        // player.body.linearDamping = 1;

        player.animations.add('right',[0,1,2,3,4,5,],10,true);
        player.animations.add('left',[6,7,8,9,10,11],10,true);


        var tween = game.add.tween(player).from({y: 1500}, 1000, Phaser.Easing.Linear.None, false,);
        tween.start();

        //水管
        var pipe = game.add.sprite(100, 1400,'pipe');
        pipe.scale.set(0.7);

        // 按键
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        

        // 镜头跟随
        game.camera.follow(player);


    }
    this.update = function(){
    // 和瓦片地图的碰撞检测
        game.physics.arcade.collide(player, layer);
        
        //  边界检测
        function collidebound(){
            if(player.body.x <= -10 ){
                player.body.x += 10;
                return false;
            } else if(player.body.x >= game.world.width - 20) {
                player.body.x -=10;
                return false;
            // } else if(player.body.y <= 0 ) {
            //     player.body.y += 10;
            //     return false;
            } else if(player.body.y >= game.world.height ){
                game.add.text(player.body.x-50,game.world.height-700,'游戏结束 !!')
                setTimeout(() => {
                    game.state.start('playmario')
                }, 1000);
                return false;
                //or gameover
                //...
            }
            else{
                return true;
            }
        }
        collidebound()

        // 响应按键
        player.body.velocity.x = 0;

        if (cursors.left.isDown )
        {
            player.body.velocity.x = -200;
    
            if (facing != 'left' )
            {
                player.animations.play('left');
                facing = 'left';
            }
        }
        else if (cursors.right.isDown )
        {
            player.body.velocity.x = 200;
    
            if (facing != 'right' )
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
                    player.frame = 6;
                }
                else
                {
                    player.frame = 0;
                }
    
                facing = 'idle';
            }
        }
        
        if (jumpButton.isDown && player.body.onFloor())
        {
            player.body.velocity.y = -250;
        }


        // // 碰到黑洞进入下一个场景
        // if(Math.abs(player.body.x - 1300) < 50 && Math.abs(player.body.y - 900) < 50 ){
        //     game.state.start('loadblock');
        // }
        
    }
}