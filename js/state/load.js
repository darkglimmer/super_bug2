var curgame = 0;
function load(game){
    this.init = function () {
        game.scale.pageAlignHorizontally=true;//水平居中
        function goPC()
        {
            var userAgentInfo = navigator.userAgent;
            var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
            isPc = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0)
                { isPc = false;
                    break; }
            }
            return isPc;
        }
        goPC();//检测pc或移动
    }
    this.preload = function () {

        //mario
        game.load.spritesheet('walk','assets/img/walk.png',120,120);
        game.load.tilemap('mario', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/img/map1.png');
        game.load.image('bug','assets/img/heidong0.png');
        game.load.image('land1','assets/img/land1.gif');
        game.load.image('land2','assets/img/land2.gif');
        game.load.image('pipe','assets/img/pipe.png');
        game.load.image('hidden','assets/img/hidden.png');
        game.load.spritesheet('enemy','assets/img/enemy.png',58,54);
        game.load.audio('bgm','assets/music/mariobgm.mp3');
        //gameover
        game.load.image('gameover','assets/img/gameover.png');
        game.load.image('restart','assets/img/restart.png');


        game.load.image('ball', 'assets/img/ball.png');
        game.load.image('person','assets/img/player.png')
        game.load.image('plank','assets/img/paddle.png')
        game.load.image('wallleft','assets/img/wallleft.png')
        game.load.image('wallright','assets/img/wallright.png')
        game.load.image('brick_1', 'assets/img/tanqiu1.png');
        game.load.image('brick_2', 'assets/img/tanqiu2.png');
        game.load.image('brick_3', 'assets/img/tanqiu3.png');
        game.load.image('brick_4', 'assets/img/tanqiu4.png');
        game.load.image('go', 'assets/img/资源2.png');
        game.load.image('back', 'assets/img/背景.png');
        game.load.audio('hit','assets/music/ball.mp3');

        //block
        game.load.image('iBox','assets/img/pc/IBox.png');
        game.load.image('lBox','assets/img/pc/LBox.png');
        game.load.image('oBox','assets/img/pc/OBox.png');
        game.load.image('tBox','assets/img/pc/TBox.png');
        game.load.image('xBox','assets/img/pc/XBox.png');
        game.load.image('bug','assets/img/heidong0.png');
        game.load.physics("blockdata", "assets/blockdata.json");
        game.load.audio('hitsound', "assets/music/ground-hit.wav");

        game.load.image('background','assets/img/map.png');

        game.load.spritesheet('walk','assets/img/walk.png',120,120);
        game.load.image('player','assets/img/player.png');
        

        this.load.image('beijing', 'assets/img/beijing1.png');
		this.load.image('fly', 'assets/img/fly.png');
		this.load.image('platform_0', 'assets/img/taijie3.png');
		this.load.image('platform_3', 'assets/img/taijie5.png');
		this.load.image('platform_1', 'assets/img/taijie2.png');
		this.load.image('platform_2', 'assets/img/taijie4.png');
		this.load.image('spring', 'assets/img/tanhuang.png');
		this.load.image('hole', 'assets/img/heidong0.png');
		this.load.audio('jump','assets/music/jump.mp3');
		this.load.audio('shoot','assets/music/spring.mp3');
		this.load.audio('hole','assets/music/hole.mp3');
        this.load.audio('click','assets/music/click.mp3');

        game.load.spritesheet('plat2', 'assets/img/plat.png',362,154,2);
        game.load.spritesheet('spring2','assets/img/spring.png',367,216,2);
        
        //ending
        game.load.tilemap('end', 'assets/end.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('endtile', 'assets/img/map2.png');
        game.load.image('castle', 'assets/img/castle.png');
        game.load.spritesheet('princess', 'assets/img/princess.png',120,120);
        game.load.image('word', 'assets/img/try.png');
        game.load.image('text1-1', 'assets/img/1-1@2x.png');
        game.load.image('text1-2', 'assets/img/1-2@2x.png');
        game.load.image('text1-3', 'assets/img/1-3@2x.png');
        game.load.image('text1-4', 'assets/img/1-4@2x.png');
        game.load.image('text1-5', 'assets/img/1-5@2x.png');
        game.load.image('text1-6_2-1', 'assets/img/1-6_2-1@2x.png');
        game.load.image('text2-2', 'assets/img/2-2@2x.png');
        game.load.image('text2-3', 'assets/img/2-3@2x.png');
        game.load.image('text2-4', 'assets/img/2-4@2x.png');
        game.load.image('text2-5', 'assets/img/2-5@2x.png');
        game.load.image('text2-6', 'assets/img/2-6@2x.png');
        game.load.image('text2-7', 'assets/img/2-7@2x.png');




        
    }
    this.create = function(){
        game.state.start('playmario');
    }
};