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
    this.init = function(){
        //获取当前可用分辨率
        if(!isPc){
            game.width = Math.floor(window.innerWidth/16)*16;
            game.height = Math.floor(window.innerHeight/16)*16;
        }
        music_1 = game.add.sound('jump');
        music_2 = game.add.sound('shoot');
        music_3 = game.add.sound('hole');
        height = game.height;
        width = game.width;
        curgame = 4;
    }
    this.create = function(){
        var bgImage = game.add.image(0, 0,'beijing');
        bgImage.scale.x = window.innerWidth/640;
        bgImage.scale.y = window.innerHeight/150;
        game.world.setBounds(0, 0, 640, 3200);//修改尺寸
        game.physics.startSystem(Phaser.Physics.P2JS);

        player = game.add.sprite(game.world.centerX, 2800, 'fly');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.gravity.y = 300;
        if(playerOnfloor){
            player.body.velocity.y = -400;
            playerOnfloor = false;
        }
        player.scale.x = window.innerWidth/640;
        player.scale.y = window.innerHeight/1136;
        // player.body.collideWorldBounds = true;
        // player.body.outOfCameraBoundsKill = true;
		// player.body.autoCull = true;


        game.physics.p2.enable(player);
        player.body.fixedRotation = true;
        cursors = game.input.keyboard.createCursorKeys();

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);


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


        var ene_g = [3,6,7,9,11,12,18,22,26,30];
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
            platform = platform_2.create(game.world.randomX, 3120 - (ene_m[i]*100), 'platform_2'); 
            platform.scale.x = window.innerWidth/1400;
            platform.scale.y = window.innerHeight/2500;
            platform.body.bounce.set(1);
        }
        
        var ene_h = [7,11,21];
        hole = game.add.group();
        hole.enableBody = true;
        hole.physicsBodyType = Phaser.Physics.ARCADE;    
        for (var i = 0; i < 3; i++)
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
            platform = spring.create(game.world.randomX, 3120 - (ene_s[i]*100), 'spring'); 
            platform.scale.set(0.5);
            platform.body.bounce.set(1);
            platform.body.immovable = true;//砖块不能动

        }
        
    },
    this.update = function(){

        if (cursors.left.isDown){
            player.x -= 8;
        }
        else if (cursors.right.isDown)
        {
            player.x += 8;
        }

        if (cursors.up.isDown)
        {
            player.y -= 8;
            player.scale.y = -1;
        }
        else if (cursors.down.isDown)
        {
            player.y += 8;
            player.scale.y = 1;
        }
        if(player.y > 3150){
            game.state.start()
        }

        game.physics.arcade.collide(player, platform_0, PlayerHitPlatform_0, null, this);
        game.physics.arcade.collide(player, platform_3, PlayerHitPlatform_3, null, this);
        game.physics.arcade.collide(player, platform_1, PlayerHitPlatform_1, null, this);
        // game.physics.arcade.collide(player, platform_2, PlayerHitPlatform_2, null, this);
        game.physics.arcade.collide(player, hole, PlayerOnHole, null, this);
        

        function PlayerHitPlatform_0(_player,_platform){
            if(_platform.y > _player.y){
                music_1.play();
                _player.body.velocity.y = -400;
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
        function PlayerOnHole(_player,_platform){
            music_3.play();
            _player.body.velocity.y = 0;
            _player.kill();
        }
        
     }
};

