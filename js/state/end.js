function ending(game){
    var map;
    var layer;
    var player;
    var bug;
    var facing = 'right';
    // var jumpTimer = 0;
    var cursors;
    var jumpButton;
    var istweening = true;
    var scaleconfig = window.innerWidth / 640;
    var pointX;
    var castle;
    var princess;
    // this.init = function(){
    //     game.scale.pageAlignHorizontally=true;//水平居中
    // }
    this.create = function(){
        
        //添加物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // 添加地图
        map = game.add.tilemap('end');
        map.addTilesetImage('SuperMarioBros-World1-1', 'endtile');
    
        layer = map.createLayer('end');
        layer.setScale(2.5 * scaleconfig);//放大了瓦片地图，注意坐标都要改变了
        layer.resizeWorld();
        // to see the collision tiles
        // layer.debug = true;

        map.setCollisionBetween(14, 16);
        map.setCollisionBetween(20, 25);
        map.setCollisionBetween(27, 29);
        map.setCollision(40);

        //城堡
        castle = game.add.sprite(770*scaleconfig, 875*scaleconfig, 'castle');
        castle.scale.set(1.5 * scaleconfig);
        //公主
        princess = game.add.sprite(930*scaleconfig,1165*scaleconfig,'princess');
        princess.scale.set(1 * scaleconfig);
        princess.animations.add('walk', [0,1],10,true);

        // 添加玩家
        player = game.add.sprite(85*scaleconfig,1080*scaleconfig,'walk');
        player.scale.set(1 * scaleconfig);
        game.physics.arcade.enable(player,false);
        player.collideWorldBounds = true;
        player.body.gravity.y = 500;
        game.time.desiredFps = 60;
        player.body.width = 70 * scaleconfig;
        
        // player.body.linearDamping = 1;

        player.animations.add('right',[0,1,2,3,4,5,],10,true);
        player.animations.add('left',[6,7,8,9,10,11],10,true);


        var tween = game.add.tween(player.body).from({y: 1180 * scaleconfig}, 1000, Phaser.Easing.Linear.None, false,);
        tween.start();
        tween.onComplete.add(() => {
            istweening = false;
        }, this);

        //水管
        var pipe = game.add.sprite(80*scaleconfig, 1200*scaleconfig, 'pipe');
        pipe.scale.set(0.8 * scaleconfig);




        // 镜头跟随
        game.camera.follow(player);
        // game.camera.deadzone = new Phaser.Rectangle(150, 100, 50, 400);


        game.input.onDown.add(function(e) {  
            pointX = e.worldX;

            if(player.body.onFloor() && !istweening && e.clientY < player.body.y - 600*scaleconfig){
                player.body.velocity.y = -350 * scaleconfig;
            }
        }, this)


    }
    this.update = function(){
        var movecamera;
        var move;
        if(player.body.x >= 650 * scaleconfig && !istweening){
            istweening = true;
            player.frame = 0;
            game.camera.unfollow();
            movecamera = game.add.tween(game.camera).to({x:700*scaleconfig},1500, Phaser.Easing.Linear.None, true)
            move = game.add.tween(princess).to({x:720 * scaleconfig},1500, Phaser.Easing.Linear.None, false);
            movecamera.onComplete.add(()=>{
                move.start();
                princess.animations.play('walk');
                move.onComplete.add(() => {
                    princess.animations.stop();
                    princess.frame = 0;
                    game.time.events.add(Phaser.Timer.SECOND * 1, ()=>{
                        game.camera.fade(0x000000, 1000);
                        game.camera.onFadeComplete.add(addword, this);
                    },this);
                })
            },this);
        }
        function addword(){
            game.add.sprite(0,0,)
        }


    // 和瓦片地图的碰撞检测
        game.physics.arcade.collide(player, layer);
        
        // 响应按键
        player.body.velocity.x = 0;


        if (pointX+5 < player.body.x  && !istweening){
            // if(player.body.x < 4600*scaleconfig){
            //     player.body.velocity.x = -500 * scaleconfig;
            // } else {
                player.body.velocity.x = -200 * scaleconfig;
            // }
    
            if (facing != 'left' ){
                player.animations.play('left');
                facing = 'left';
            }
        }

        else if ( pointX-5  > player.body.x  && !istweening){
            // if(player.body.x > 200 *scaleconfig){
            //     player.body.velocity.x = 500 * scaleconfig;
            // } else {
                player.body.velocity.x = 200 * scaleconfig;
            // }
            
    
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

    }

}