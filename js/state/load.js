var isPc;
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
        game.load.image('gameover','assets/img/gameover.png');


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
        game.load.audio('hit','assets/music/弹球1.1.mp3');

        //block
        game.load.image('iBox','assets/img/pc/IBox.png');
        game.load.image('lBox','assets/img/pc/LBox.png');
        game.load.image('oBox','assets/img/pc/OBox.png');
        game.load.image('tBox','assets/img/pc/TBox.png');
        game.load.image('xBox','assets/img/pc/XBox.png');
        game.load.image('bug','assets/img/heidong0.png');
        game.load.physics("blockdata", "assets/blockdatas.json");
        game.load.audio('hitsound', "assets/music/ground-hit.wav");

        game.load.image('background','assets/img/map.png');

        game.load.spritesheet('walk','assets/img/walk.png',120,120);
        game.load.image('player','assets/img/player.png');
        

        this.load.image('background', 'assets/img/beijing1.png');
		this.load.image('person', 'assets/img/fly.png');
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
    }
    this.create = function(){
        game.state.start('playblock');
    }
};