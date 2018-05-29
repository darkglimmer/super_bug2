var width,height;

function playMario(game){
    var map;
    var layer;
    var player;
    var bug;
    var facing = 'right';
    // var jumpTimer = 0;
    var cursors;
    var jumpButton;
    var currentDataString;
    var enemy1,enemy2,enemy;
    var istweening;
    var bgm;

    var ene = [[20,1452],[1300,1452],[250,960]];

    this.init = function(){
        //获取当前可用分辨率
        if(!isPc){
            game.width = Math.floor(window.innerWidth/16)*16;
            game.height = Math.floor(window.innerHeight/16)*16;
        }

        height = game.height;
        width = game.width;
        istweening = false;
        
    }
    this.create = function () {
        //添加物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // game.physics.arcade.gravity.y = 100;
        // game.world.scale.x = 1.5;
        // game.world.scale.y = 1.5;
        bgm = game.add.sound('bgm',1,true);
        bgm.play()

        //背景
        // var bg = game.add.image(0,100,'background1');
        // bg.scale.set(1.6);//
        // bg.fixedToCamera = true;


        // 添加地图
        map = game.add.tilemap('mario');
    
        map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
    
        //  注意这里的索引是tiled里面显示的以瓦片为单位的坐标 tile.x tile.y不准确（可能是因为setscale
        map.setTileLocationCallback(89, 61, 1, 1, hitpipe, this);
        map.setTileLocationCallback(90, 61, 1, 1, hitpipe, this);

        layer = map.createLayer('World1');
        layer.setScale(1.5);//放大了瓦片地图，注意坐标都要改变了
        layer.resizeWorld();
        // to see the collision tiles
        // layer.debug = true;

        map.setCollisionBetween(13, 17);
        map.setCollisionBetween(20, 25);
        map.setCollisionBetween(27, 29);
        map.setCollision(40);
        
        // // 黑洞
        // bug = game.add.sprite(1300,900,'bug');
        // bug.scale.set(0.5);
        // bug.anchor.setTo(0.5,0.5);
        // // game.physics.arcade.enable(bug, false);
        // // bug.body.immovable = true;


        // 添加玩家
        player = game.add.sprite(100, 0,'walk');
        // player = game.add.sprite(2130,1300,'walk');
        player.scale.set(0.7);
        game.physics.arcade.enable(player,false);
        player.collideWorldBounds = true;
        // player.body.bounce.y = 0.2;
        player.body.gravity.y = 200;
        // game.time.desiredFps = 30;
        player.body.width = 55;

        player.animations.add('walkR',[1,2,3,4]);
        // player.body.linearDamping = 1;

        player.animations.add('right',[0,1,2,3,4,5,],10,true);
        player.animations.add('left',[6,7,8,9,10,11],10,true);


        // var tween = game.add.tween(player).from({y: 100}, 1000, Phaser.Easing.Linear.None, false,);
        // tween.start();

        // 水管
        var pipe = game.add.sprite(2110, 1460,'pipe');
        pipe.scale.set(0.7);
        pipe.inputEnabled = true;
        pipe.events.onInputDown.add(next, this);
        


        //敌人
        // enemy1 = game.add.sprite(20, 1452,'enemy');
        // game.physics.arcade.enable(enemy1,false);
        // enemy1.collideWorldBounds = true;
        // enemy1.body.gravity.y = 200;
        // enemy1.body.velocity.x = 100;
        // enemy1.animations.add('move',[0,1],5,true);
        // enemy1.animations.play('move');

        // enemy2 = game.add.sprite(1300, 1452,'enemy');
        // game.physics.arcade.enable(enemy2,false);
        // enemy2.collideWorldBounds = true;
        // enemy2.body.gravity.y = 200;
        // enemy2.body.velocity.x = 100;
        // enemy2.animations.add('move',[0,1],5,true);
        // enemy2.animations.play('move');


        enemy = game.add.group();
        enemy.enableBody = true;
        enemy.physicsBodyType = Phaser.Physics.ARCADE;
        for(var i = 0; i < ene.length; i++){
            var e = enemy.create(ene[i][0],ene[i][1],'enemy');
            e.animations.add('move',[0,1],5,true);
            e.animations.play('move');
            // game.time.events.loop(1000,function(){
            //     e.body.velocity.x *= -1;
            // })
        }

        enemy.setAll('body.collideWorldBounds', true);
        enemy.setAll('body.gravity.y', 200);
        enemy.setAll('body.velocity.x', 100);
        game.time.events.loop(2000, () => {
            enemy.setAll('body.velocity.x', -1, true,false,3);
        },this);

        // 按键
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        


        // 镜头跟随
        game.camera.follow(player);

        function hitpipe(sprite, tile){
            if(cursors.down.isDown){
                next();
            }
            return true;
        }
        function next(){
            if(player.body.x > 2100 && player.body.x < 2140){
                var intopipe = game.add.tween(player.body).to({y: 1452}, 1000, Phaser.Easing.Linear.Out, false,);
                intopipe.start();
                intopipe.onStart.add(() => {
                    istweening = true;
                }, this);
                intopipe.onComplete.add(() => {
                    istweening = false;
                    game.state.start('playblock');
                }, this)
            }
;
        }
        game.input.onDown.add(function(e) {  
  
            // if(e.clientX < player.x) {  
            //     player.body.velocity.x = -200;  
            // } else {  
            //     player.body.velocity.x = 200;  
            // }  

            // if(e.clientY < game.height / 3 * 2 && player.body.onFloor()) {  
            //     player.body.velocity.y = -200;  
            // }  

            if(player.body.onFloor()&&!istweening){
                player.body.velocity.y = -250;
            }
        }, this)

    }
    this.update = function () {



        // 和瓦片地图的碰撞检测
        game.physics.arcade.collide(player, layer);
        // game.physics.arcade.collide(enemy1, layer);
        // game.physics.arcade.collide(player, enemy1, hitenemy);

        game.physics.arcade.collide(enemy, layer);

        game.physics.arcade.collide(player, enemy, hitenemy);

        // game.physics.arcade.collide(enemy2, layer);
        // game.physics.arcade.collide(player, enemy2,hitenemy);

        // if(enemy1.body.x > 500 || enemy1.body.x < 10){
        //     enemy1.body.velocity.x *= -1;
        // }
        // if(enemy2.body.x > 1800 || enemy2.body.x < 1100){
        //     enemy2.body.velocity.x *= -1;
        // }
        function hitenemy(_player, _enemy){
            if(!_enemy.body.touching.up){
                istweening = true;
                game.add.text(player.body.x,game.world.height-700,'游戏结束 !!')
                game.time.events.add(Phaser.Timer.SECOND * 1,() => {
                    bgm.stop();game.state.start('playmario');},this);
            }else{
                _enemy.kill();
            }
            return true;
        }
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
                istweening = true;
                player.body.velocity.y = 0;
                setTimeout(() => {
                    bgm.stop();
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

        if ((cursors.left.isDown || game.input.worldX < player.body.x  )&& !istweening)
        {
            player.body.velocity.x = -200;
    
            if (facing != 'left' )
            {
                player.animations.play('left');
                facing = 'left';
            }
        }
        else if ((cursors.right.isDown || game.input.worldX - 15 > player.body.x ) && !istweening)
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





       
    }
    this.render = function () {

        // game.debug.text(game.time.suggestedFps, 32, 32);
    
        // game.debug.text(game.time.physicsElapsed, 32, 32);
        // game.debug.inputInfo(32, 300);
        game.debug.body(player);
        // game.debug.body(enemy2);
        // game.debug.bodyInfo(player, 16, 24);
        // game.debug.cameraInfo(game.camera, 32, 100);



        // game.debug.text('Tile X: ' + layer.getTileX(player.x), 32, 48, 'rgb(0,0,0)');
        // game.debug.text('Tile Y: ' + layer.getTileY(player.y), 32, 64, 'rgb(0,0,0)');
    }
   
}
