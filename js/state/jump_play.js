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
    }
    this.create = function(){
        game.add.tileSprite(0, 0, 640, 3200, 'background');
        game.world.setBounds(0, 0, 640, 3200);//修改尺寸
        game.physics.startSystem(Phaser.Physics.P2JS);

        player = game.add.sprite(game.world.centerX, 3000, 'person');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        // player.anchor.x = 0.5;
        player.body.gravity.y = 300;
        if(playerOnfloor){
            player.body.velocity.y = -500;
            playerOnfloor = false;
        }
        player.scale.set(0.5);//设置图片大小
        player.body.collideWorldBounds = true;
        player.body.outOfCameraBoundsKill = true;
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
        for (var i = 0; i < 30; i++)
        {
            // platform = platform_0.create(game.world.randomX, game.world.randomY, 'platform_0');
            platform = platform_0.create(game.world.randomX, game.world.randomY, 'spring2'); 
            platform.scale.set(0.2);
            platform.body.bounce.set(1);
            
            // platform.body.immovable = true;//砖块不能动

        }

        platform_3 = game.add.group();
        platform_3.enableBody = true;
        platform_3.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 15; i++)
        {
            platform = platform_3.create(game.world.randomX, game.world.randomY, 'platform_3');
            platform.scale.set(0.2);
            platform.body.bounce.set(1);
            //platform.body.immovable = true;//砖块不能动

        }

        platform_1 = game.add.group();
        platform_1.enableBody = true;
        platform_1.physicsBodyType = Phaser.Physics.ARCADE;        
        for (var i = 0; i < 10; i++)
        {
            platform = platform_1.create(game.world.randomX, game.world.randomY, 'platform_1');
            platform.scale.set(0.2);
            platform.body.bounce.set(1);
            //platform.body.immovable = true;//砖块不能动

        }
        platform_2 = game.add.group();
        platform_2.enableBody = true;
        platform_2.physicsBodyType = Phaser.Physics.ARCADE;         
        for (var i = 0; i < 5; i++)
        {
            // platform = platform_2.create(game.world.randomX, game.world.randomY, 'platform_2');
            platform = platform_2.create(game.world.randomX, game.world.randomY, 'plat2');
            
            platform.scale.set(0.2);
            platform.body.bounce.set(1);
            // platform.body.immovable = true;//砖块不能动

        }
        
        
        hole = game.add.group();
        hole.enableBody = true;
        hole.physicsBodyType = Phaser.Physics.ARCADE;    
        for (var i = 0; i < 3; i++)
        {
            platform = hole.create(game.world.randomX, game.world.randomY, 'hole');
            platform.scale.set(0.3);
            platform.body.bounce.set(1);
            //platform.body.immovable = true;//砖块不能动

        }
        
            
		// player.events.onKilled.add(function(sprite){
        //     出现死亡界面
        //     this.gameEnd(false);
        // },this);
        

        
        // 开启鼠标事件
        // game.input.mouse.capture = true;
        // isRun = true;

        // game.mouseSprite = this.add.sprite(0,0);
		// game.mouseSprite.visible = false;
        // game.physics.arcade.enable(this.mouseSprite);
        
        
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

        game.physics.arcade.collide(player, platform_0, PlayerHitPlatform_0, null, this);
        game.physics.arcade.collide(player, platform_3, PlayerHitPlatform_3, null, this);
        game.physics.arcade.collide(player, platform_1, PlayerHitPlatform_1, null, this);
        game.physics.arcade.collide(player, hole, PlayerOnHole, null, this);
        game.physics.arcade.collide(player, platform_2, PlayerHitPlatform_2, null, this);


        function PlayerHitPlatform_0(_player,_platform){
            hitspring = _platform.animations.add('spring',[0,1],60,false);
            
            if(_platform.y > _player.y){
                music_1.play();
                _player.body.velocity.y = -400;
                hitspring.play('spring');
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
                _platform.body.moves = true;
			    _platform.body.collideWorldBounds = true;
			    _platform.body.onWorldBounds = null;
                _platform.body.bounce.x = 1;
                _player.body.velocity.y = -400;
            }
            else{
                music_1.play();  
                _platform.body.moves = true;
			    _platform.body.collideWorldBounds = true;
			    _platform.body.onWorldBounds = null;
                _platform.body.bounce.x = 1;
                _player.body.velocity.y = 300;
            }
            
        }

        function PlayerHitPlatform_2(_player,_platform){

            hitplat = _platform.animations.add('break',[0,1],60,false);
            hitplat.play('break',[0,1],false,true);
            if(_platform.y > _player.y){
                music_1.play();
                _player.body.velocity.y = -400;
                // _platform.kill();
            }
            else{
                music_1.play();
                _player.body.velocity.y = 300;
                // _platform.kill();
            }
           
            
        }
        function PlayerOnHole(_player,_platform){
            music_3.play();
            _player.body.velocity.y = 0;
            _player.kill();
        }
        
     }
};

