var width,height;
var scaleconfig = window.innerWidth / 640;
var bgm;
function playMario(game){
    var map;
    var layer;
    var player;
    var bug;
    var facing = 'right';
    // var jumpTimer = 0;
    // var cursors;
    var jumpButton;
    var currentDataString;
    var enemy1,enemy2,enemy;
    var istweening;
    var land;

    var scaleconfig = window.innerWidth / 640;
    var ene = [[70,1200],[1450,1200],[3350,1200]];
    var pointX;
    var hidden;

    this.init = function(){
        game.input.x = 4330 * scaleconfig;
        curgame = 1;
        istweening = false;
    }
    this.create = function () {

        
        //添加物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#000000';
        
        //背景音乐
        bgm = game.add.sound('bgm',1,true);
        bgm.play()

        // 添加地图
        map = game.add.tilemap('mario');
        map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
    
        layer = map.createLayer('World1');
        layer.setScale(2.5 * scaleconfig);//放大了瓦片地图，注意坐标都要改变了
        layer.resizeWorld();

        // to see the collision tiles
        // layer.debug = true;
        map.setCollisionBetween(13, 17);
        map.setCollisionBetween(20, 25);
        map.setCollisionBetween(27, 29);
        map.setCollision(40);
        
        //假地

        land = game.add.group();
        land.enableBody = true;
        land.physicsBodyType = Phaser.Physics.ARCADE;
        for(var i = 3900; i < 4300; i += 120 ){
            var l1 = land.create(i, 2000, 'land2');
            l1.scale.set(2);
            var l2 = land.create(i, 2120, 'land1');
            l2.scale.set(2);
        }
        land.setAll('body.immovable', true);
        

        //箭头

        var arrow = game.add.sprite(4170*scaleconfig, 1100*scaleconfig,'arrow');
        arrow.scale.y = -0.15*scaleconfig;
        arrow.scale.x = 0.15*scaleconfig;
        
        var arrowtween = game.add.tween(arrow).to({y: 1120*scaleconfig}, 500, Phaser.Easing.Linear.Out, true,)

        // 添加玩家
        // player = game.add.sprite(200, 200,'walk');
        player = game.add.sprite(6000,1500,'walk');
        player.scale.set(1 * scaleconfig);
        game.physics.arcade.enable(player,false);
        player.collideWorldBounds = true;
        // player.body.bounce.y = 0.2;
        player.body.gravity.y = 700;
        game.time.desiredFps = 60;
        player.body.width = 70 * scaleconfig;

        // player.body.linearDamping = 1;

        player.animations.add('right',[0,1,2,3,4,5,],10,true);
        player.animations.add('left',[6,7,8,9,10,11],10,true);
        
        
        hidden = game.add.sprite(3280,1630,'hidden');
        hidden.scale.set(1 * scaleconfig);
        game.physics.arcade.enable(hidden,false);
        hidden.alpha = 0;
        hidden.body.immovable = true;


        
        // 水管
        var pipe = game.add.sprite(4230 * scaleconfig, 1170 * scaleconfig,'pipe');
        pipe.scale.set(1 * scaleconfig);
        pipe.inputEnabled = true;
        pipe.events.onInputDown.add(next, this);
        

        enemy = game.add.group();
        enemy.enableBody = true;
        enemy.physicsBodyType = Phaser.Physics.ARCADE;
        for(var i = 0; i < ene.length; i++){
            var e = enemy.create(ene[i][0] * scaleconfig, ene[i][1] * scaleconfig, 'enemy');
            e.scale.set(1.5 * scaleconfig);
            e.animations.add('move',[0,1],5,true);
            e.animations.play('move');
            // game.time.events.loop(1000,function(){
            //     e.body.velocity.x *= -1;
            // })
        }

        enemy.setAll('body.collideWorldBounds', true);
        enemy.setAll('body.gravity.y', 200);
        enemy.setAll('body.velocity.x', 300);
        game.time.events.loop(2000, function() {
            enemy.setAll('body.velocity.x', -1, true,false,3);
        },this);

        // 按键
        // cursors = game.input.keyboard.createCursorKeys();
        // jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        


        // 镜头跟随
        game.camera.follow(player);


        // game.camera.deadzone = new Phaser.Rectangle(250, 100, 200, 400);


        
        function next(){
            if(player.body.x > 4200 * scaleconfig && player.body.x < 4280 * scaleconfig){
                var intopipe = game.add.tween(player.body).to({y: 1780}, 1000, Phaser.Easing.Linear.Out, false,);
                intopipe.start();
                intopipe.onStart.add(function() {
                    istweening = true;
                }, this);
                intopipe.onComplete.add(function() {
                    istweening = false;
                    game.state.start('playblock');
                }, this)
            }
;
        }
        game.input.onDown.add(function(e) {  
            pointX = e.worldX;

            if(player.body.onFloor() && !istweening && e.clientY < player.body.y - 300*scaleconfig){
                player.body.velocity.y = -450 * scaleconfig;
            }
        }, this)

    }
    this.update = function () {

        // 和瓦片地图的碰撞检测
        game.physics.arcade.collide(player, layer);
        game.physics.arcade.collide(enemy, layer);
        game.physics.arcade.collide(player, enemy, hitenemy);
        game.physics.arcade.collide(player, hidden, hithidden);
        game.physics.arcade.collide(player, land, hitland);

        function hitland(_player, _land){
            land.setAll('body.velocity.y', 300);
            return false;
        }
        function hithidden(_player, _hidden){
            hidden.alpha = 1;
            return true;
        }

        function gameover(){
            // var gameover = game.add.sprite(game.camera.x ,  game.camera.height/2, 'gameover');
            // gameover.scale.set(2.5);
            
            game.time.events.add(Phaser.Timer.SECOND * 1,function() {
                game.state.start('gameover');},this);
        }
        function hitenemy(_player, _enemy){
            if(!_enemy.body.touching.up){
                if(!istweening){
                    istweening = true;
                    // game.add.text(player.body.x,game.world.height-700,'游戏结束 !!')
                    game.camera.fade(0x000000, 1000);
                    // player.kill();
                    game.camera.onFadeComplete.add(gameover, this);
                }

            }else{
                _enemy.kill();
            }
            return true;
        }
        
        //是否掉下去
         if(player.body.y >= game.world.height && !istweening){
                // game.add.text(player.body.x-50,game.world.height-700,'游戏结束 !!')
                istweening = true;
                player.kill();

                bgm.stop();
                game.camera.fade(0x000000, 1000,true);

                game.camera.onFadeComplete.add(gameover, this);
            }

        // 响应按键
        player.body.velocity.x = 0;

        if (pointX < player.body.x  && !istweening){
            if(player.body.x < 4600*scaleconfig){
                player.body.velocity.x = -500 * scaleconfig;
            } else {
                player.body.velocity.x = -200 * scaleconfig;
            }
    
            if (facing != 'left' ){
                player.animations.play('left');
                facing = 'left';
            }
        }

        else if ( pointX-50  > player.body.x  && !istweening){
            if(player.body.x > 200 *scaleconfig){
                player.body.velocity.x = 500 * scaleconfig;
            } else {
                player.body.velocity.x = 200 * scaleconfig;
            }
            
    
            if (facing != 'right' ){
                player.animations.play('right');
                facing = 'right';
            }
        }else {
            if (facing != 'idle'){
                player.animations.stop();
    
                if (facing == 'left'){
                    player.frame = 6;
                } else {
                    player.frame = 0;
                }
    
                facing = 'idle';
            }
        }
        
        // if (jumpButton.isDown && player.body.onFloor())
        // {
        //     player.body.velocity.y = -400 * scaleconfig;
        // }





       
    }
    this.render = function () {


        // game.debug.text(game.time.suggestedFps, 32, 32);
    
        // game.debug.text(game.time.physicsElapsed, 32, 32);
        // game.debug.inputInfo(32, 300);
        // game.debug.body(player);
        // game.debug.bodyInfo(player, 100, 100);
        // game.debug.cameraInfo(game.camera, 32, 100);



    }
   
}
