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
    var atlas;
    var spring;
    var hole;
    var isRun = false;
    var playerOnfloor = true;
    atlas = game.add.group();
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
        game.add.image(0,0,'background');
        game.world.setBounds(0, 0, 660, 2000);//修改尺寸
        game.physics.startSystem(Phaser.Physics.ARCADE);//开启物理引擎
        //地板
        atlas = game.add.group();
        for (var i = 0; i < 60; i++)
        {
            atlas.create(game.world.randomX, game.world.randomY, 'platform_0');
        }
        for (var i = 0; i < 20; i++)
        {
            atlas.create(game.world.randomX, game.world.randomY, 'platform_3');
        }
        for (var i = 0; i < 15; i++)
        {
            atlas.create(game.world.randomX, game.world.randomY, 'platform_1');
        }
        for (var i = 0; i < 5; i++)
        {
            atlas.create(game.world.randomX, game.world.randomY, 'platform_2');
        }

        //弹簧
        spring = game.add.group();
        //黑洞
        hole = game.add.sprite(this.world.randomX, 0, 'atlas','hole');
		hole.visible = false;
		hole.anchor.set(0.5);
        hole.scale.set(gameScale);
        game.physics.enable(hole, Phaser.Physics.ARCADE);
        
        game.physics.enable(atlas, Phaser.Physics.ARCADE);
        brick.body.bounce.set(1);//反弹
		atlas.body.collideWorldBounds = false;
		atlas.body.velocity.x = l(0, 1) == 0 ? 200 : -200;
		atlas.body.moves = false;
        
        player = game.add.sprite(game.world.centerX, 1000,'person');
        player.anchor.x = 0.5;
        player.body.outOfCameraBoundsKill = true;
		player.body.autoCull = true;
		player.events.onKilled.add(function(sprite){
            //出现死亡界面
            this.gameEnd(false);
        },this);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        //设置重力
        player.body.gravity.y = 300;
        player.body.velocity.y = -100;
        //player.scale.set(0.5);设置图片大小


        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1);
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
       
        
        //开启鼠标事件
        game.input.mouse.capture = true;
        isRun = true;

        game.mouseSprite = this.add.sprite(0,0);
		game.mouseSprite.visible = false;
        game.physics.arcade.enable(this.mouseSprite);
        
        if (playerOnfloor)
        {
            playerOnfloor = false;
            player.body.velocity.y = -100;
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

        if (fireButton.isDown)
        {
            fireBullet();
        }

        playerHitPlatform

        game.physics.arcade.collide(player, platform_0, PlayerHitPlatform_0, null, this);
        game.physics.arcade.collide(player, platform_3, PlayerHitPlatform_3, null, this);
        game.physics.arcade.collide(player, platform_1, PlayerHitPlatform_1, null, this);

        

        function PlayerHitPlatform_0(_player,_platform){
            music_1.play();
            _player.body.velocity.y = -150;
                var diff = 0;
                if (_player.x < _platform.x)
                {
                    diff = _platform.x - _player.x;
                    _player.body.velocity.x = (-5 * diff);
                }
                else if (_player.x > _platform.x)
                {
                    diff =  _player.x -_platform.x;
                    _player.body.velocity.x = (5 * diff);
                }
                else
                {
                    _player.body.velocity.x = 2 + Math.random() * 8;
                }
        }

        function PlayerHitPlatform_3(_player,_platform){
            music_1.play();
            _player.body.velocity.y = -150;
            if (_player.x < _platform.x)
                {
                    diff = _platform.x - _player.x;
                    _player.body.velocity.x = (-5 * diff);
                }
                else if (_player.x > _platform.x)
                {
                    diff =  _player.x -_platform.x;
                    _player.body.velocity.x = (5 * diff);
                }
                else
                {
                    _player.body.velocity.x = 2 + Math.random() * 8;
                }
            _platform.kill();
        }

        function PlayerHitPlatform_1(_player,_platform){
            music_1.play();  
            _platform.body.moves = true;
			_platform.body.collideWorldBounds = true;
			_platform.body.onWorldBounds = null;
            _platform.body.bounce.x = 1;
            _player.body.velocity.y = -150;
        }

        function PlayerHitPlatform_2(_player,_platform){
            music_1.play();
            _player.body.velocity.y = -150;
            _platform.kill();
        }
        
    }

};

