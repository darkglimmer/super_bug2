var width,height;
function l(a, b) {
    a = Math.round(a);
    b = Math.round(b);
    return Math.round((b - a) * Math.random()) + a
}
function ranArr(a, b) {
	return Math.random()>.5 ? -1 : 1;
};
function playjump(game){
    var music_1;
    var music_2;
    var music_3;
    var platform_0;
    var platform_1;
    var platform_2;
    var platform_3;
    var spring;
    var hole;
    var isRun = false;
    var playerOnfloor = true;
    var cursors;
    var hitplat;
    var hitspring;
    var pointX;

    this.init = function(){
        music_1 = game.add.sound('jump');
        music_2 = game.add.sound('shoot');
        music_3 = game.add.sound('hole');
        height = game.height;
        width = game.width;
        curgame = 5;
    }
    this.create = function(){

        bgm = game.add.sound('bgm',1,true);

        var bgImage = game.add.image(0, 0,'beijing');
        bgImage.scale.x = window.innerWidth/640;
        bgImage.scale.y = window.innerHeight/150;
        game.world.setBounds(0, 0, 640, 3200);//修改尺寸
        // game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.startSystem(Phaser.Physics.ARCADE);




        player = game.add.sprite(game.world.centerX, 2800, 'fly');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.gravity.y = 300;
        if(playerOnfloor){
            player.body.velocity.y = -400;
            playerOnfloor = false;
        }
        player.scale.x = window.innerWidth/640;
        player.scale.y = window.innerHeight/1136;

        // game.physics.p2.enable(player);
        // player.body.fixedRotation = true;
        // cursors = game.input.keyboard.createCursorKeys();

        // game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        game.camera.follow(player);


        platform_0 = game.add.group();
        platform_0.enableBody = true;
        platform_0.physicsBodyType = Phaser.Physics.ARCADE;
        spring = game.add.group();
        spring.enableBody = true;
        spring.physicsBodyType = Phaser.Physics.ARCADE;    


        var platform;
        for (var i = 0; i < 3; i++)
        {
            platform = platform_0.create(240 * i, 3120, 'platform_0');
            platform.scale.x = window.innerWidth/1400;
            platform.scale.y = window.innerHeight/2500;
            platform.body.bounce.set(1);
            platform.body.immovable = true;//砖块不能动

        }


        var ene_g = [3,6,9,11,14,17,21,24,27,30];
        for (var i = 0; i < 10; i++)
        {
            platform = platform_0.create(game.world.randomX, 3120 - (ene_g[i]*100), 'platform_0'); 

            platform.scale.x = window.innerWidth/1400;
            platform.scale.y = window.innerHeight/2500;
            platform.body.bounce.set(1);
            platform.body.immovable = true;//砖块不能动

        }

        var ene_w = [15,17,18,24,29];
        platform_3 = game.add.group();
        platform_3.enableBody = true;
        platform_3.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 5; i++)
        {
            platform = platform_3.create(game.world.randomX, 3120 - (ene_w[i]*100), 'platform_3'); 
            platform.scale.x = window.innerWidth/1400;
            platform.scale.y = window.innerHeight/2500;
            platform.body.bounce.set(1);
        }

        var ene_b = [2,8,13,17,24];
        platform_1 = game.add.group();
        platform_1.enableBody = true;
        platform_1.physicsBodyType = Phaser.Physics.ARCADE;        
        for (var i = 0; i < 5; i++)
        {
            platform = platform_1.create(game.world.randomX, 3120 - (ene_b[i]*100), 'platform_1'); 
            platform.scale.x = window.innerWidth/1400;
            platform.scale.y = window.innerHeight/2500;
            platform.body.bounce.set(1);
            //platform.body.immovable = true;//砖块不能动

        }

        var ene_m = [10,14,23];
        platform_2 = game.add.group();
        platform_2.enableBody = true;
        platform_2.physicsBodyType = Phaser.Physics.ARCADE;         
        for (var i = 0; i < 3; i++)
        {
            platform = platform_2.create(game.world.randomX, 3120 - (ene_m[i]*100), 'plat2'); 
            platform.scale.x = window.innerWidth/1400;
            platform.scale.y = window.innerHeight/2500;
            platform.body.bounce.set(1);
            platform.body.immovable = true;//砖块不能动
        }
        
        var ene_h = [21,31];
        hole = game.add.group();
        hole.enableBody = true;
        hole.physicsBodyType = Phaser.Physics.ARCADE;    
        for (var i = 0; i < 2; i++)
        {
            platform = hole.create(game.world.randomX, 3120 - (ene_h[i]*100), 'hole');
            platform.scale.set(0.6);
            platform.body.bounce.set(1);

        }

        var ene_s = [9,15,27];
        spring = game.add.group();
        spring.enableBody = true;
        spring.physicsBodyType = Phaser.Physics.ARCADE;    
        for (var i = 0; i < 3; i++)
        {
            platform = spring.create(game.world.randomX, 3120 - (ene_s[i]*100), 'spring2'); 
            platform.scale.x = window.innerWidth/1400;
            platform.scale.y = window.innerHeight/2500;
            platform.body.bounce.set(1);
            platform.body.immovable = true;//砖块不能动

        }

        game.input.onDown.add(function(e) {  
            pointX = e.worldX;
        }, this)
    },
    this.update = function(){

        // if (cursors.left.isDown){
        //     player.x -= 8;
        // }
        // else if (cursors.right.isDown)
        // {
        //     player.x += 8;
        // }

        // if (cursors.up.isDown)
        // {
        //     player.y -= 8;
        //     player.scale.y = -1;
        // }
        // else if (cursors.down.isDown)
        // {
        //     player.y += 8;
        //     player.scale.y = 1;
        // }


        if(player.y > 3150){
            game.state.start("gameover");
        }
        if(player.y < 0){
            game.state.start("end");
        }

        player.body.velocity.x = 0;

        if (pointX < player.body.x ){
            player.body.velocity.x = -500;
        }
        else if (pointX - 50  > player.body.x){
            player.body.velocity.x = 500;
        }

        game.physics.arcade.collide(player, platform_0, PlayerHitPlatform_0, null, this);
        game.physics.arcade.collide(player, platform_3, PlayerHitPlatform_3, null, this);
        game.physics.arcade.collide(player, platform_1, PlayerHitPlatform_1, null, this);
        game.physics.arcade.collide(player, platform_2, PlayerHitPlatform_2, null, this);
        game.physics.arcade.collide(player, hole, PlayerOnHole, null, this);
        game.physics.arcade.collide(player,spring,PlayerHitSpring,null,this);


        function PlayerHitPlatform_0(_player,_platform){
            hitspring = _platform.animations.add('spring2',[0,1],60,false);
            
            if(_platform.y > _player.y){
                music_1.play();
                _player.body.velocity.y = -400;
                hitspring.play('spring2');
            }
            else{
                music_1.play();
                _player.body.velocity.y = 300;
            }
        }

        function PlayerHitPlatform_3(_player,_platform){
            if(_platform.y > _player.y){
                music_1.play();
                _player.body.velocity.y = -400;
                _platform.kill();
            }
            else{
                music_1.play();
                _player.body.velocity.y = 300;
                _platform.kill();

            }
            
        }

        function PlayerHitPlatform_1(_player,_platform){
            if(_platform.y > _player.y){
                music_1.play();  
			    _platform.body.collideWorldBounds = true;
                _platform.body.bounce.x = 1;
                _player.body.velocity.y = -400;
            }
            else{
                music_1.play();  
			    _platform.body.collideWorldBounds = true;
                _platform.body.bounce.x = 1;
                _player.body.velocity.y = 300;
            }
            
        }

        function PlayerHitPlatform_2(_player,_platform){
            hitplat = _platform.animations.add('break',[0,1],60,false);
            hitplat.play('break',[0,1],10,false,true);
            if(_platform.y > _player.y){
                music_1.play();
                _player.body.velocity.y = -400;

            }
            else{
                music_1.play();
                _player.body.velocity.y = 300;
            }
           
            
        }
        function PlayerOnHole(_player,_platform){
            if(_platform.body.y > 500){
                music_3.play();
                _player.body.velocity.y = 0;
                _player.kill();
                game.state.start("gameover");
            }
            else{
                music_3.play();
                _player.body.velocity.y = 0;
                _player.kill();
                game.state.start("ending");
            }
        }
        
        function PlayerHitSpring(_player,_platform){
            hitspring = _platform.animations.add('spring',[0,1], 60 ,false);
            if(_platform.y > _player.y){	             
                music_1.play();	                
                _player.body.velocity.y = -700;	           
                hitspring.play('spring');
            }
            else{	           
                _player.body.velocity.y = 300;	                
            } 
        }     	
    }
};

