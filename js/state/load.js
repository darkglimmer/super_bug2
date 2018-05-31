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
        game.load.image('first','assets/img/first.png');
        game.load.image('warning','assets/img/warning.png');
        game.load.image('muxi','assets/img/muxi@2x.png');
        game.load.spritesheet('start','assets/img/startbotton.png')
        game.load.spritesheet('gif','assets/img/gif.png',640,1136,24);
        game.load.crossOrigin = 'anonymous'
        //mariohttp://p9lce13x8.bkt.clouddn.com/click.mp3
        game.load.spritesheet('walk','http://p9lce13x8.bkt.clouddn.com/walk.png',120,120);
        game.load.tilemap('mario', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'http://p9lce13x8.bkt.clouddn.com/map1.png');
        game.load.image('bug','http://p9lce13x8.bkt.clouddn.com/heidong0.png');
        game.load.image('land1','http://p9lce13x8.bkt.clouddn.com/land1.gif');
        game.load.image('land2','http://p9lce13x8.bkt.clouddn.com/land2.gif');
        game.load.image('pipe','http://p9lce13x8.bkt.clouddn.com/pipe.png');
        game.load.image('hidden','http://p9lce13x8.bkt.clouddn.com/hidden.png');
        game.load.spritesheet('enemy','http://p9lce13x8.bkt.clouddn.com/enemy.png',58,54);
        game.load.audio('bgm','http://p9lce13x8.bkt.clouddn.com/mariobgm.mp3');
        game.load.image('arrow','http://p9lce13x8.bkt.clouddn.com/tip.png');
        //gameover
        game.load.image('gameover','http://p9lce13x8.bkt.clouddn.com/gameover.png');
        game.load.image('restart','http://p9lce13x8.bkt.clouddn.com/restart.png');


        game.load.image('ball', 'http://p9lce13x8.bkt.clouddn.com/ball.png');
        game.load.image('person','http://p9lce13x8.bkt.clouddn.com/player.png')
        game.load.image('plank','http://p9lce13x8.bkt.clouddn.com/paddle.png')
        game.load.image('wallleft','http://p9lce13x8.bkt.clouddn.com/wallleft.png')
        game.load.image('wallright','http://p9lce13x8.bkt.clouddn.com/wallright.png')
        game.load.image('brick_1', 'http://p9lce13x8.bkt.clouddn.com/tanqiu1.png');
        game.load.image('brick_2', 'http://p9lce13x8.bkt.clouddn.com/tanqiu2.png');
        game.load.image('brick_3', 'http://p9lce13x8.bkt.clouddn.com/tanqiu3.png');
        game.load.image('brick_4', 'http://p9lce13x8.bkt.clouddn.com/tanqiu4.png');
        game.load.image('go', 'http://p9lce13x8.bkt.clouddn.com/资源2.png');
        game.load.image('back', 'http://p9lce13x8.bkt.clouddn.com/背景.png');
        game.load.audio('hit','http://p9lce13x8.bkt.clouddn.com/ball.mp3');

        //block
        game.load.image('iBox','http://p9lce13x8.bkt.clouddn.com/IBox.png');
        game.load.image('lBox','http://p9lce13x8.bkt.clouddn.com/LBox.png');
        game.load.image('oBox','http://p9lce13x8.bkt.clouddn.com/OBox.png');
        game.load.image('tBox','http://p9lce13x8.bkt.clouddn.com/TBox.png');
        game.load.image('xBox','http://p9lce13x8.bkt.clouddn.com/XBox.png');
        game.load.image('bug','http://p9lce13x8.bkt.clouddn.com/heidong0.png');
        game.load.physics("blockdata", "assets/blockdata.json");
        game.load.audio('hitsound', "http://p9lce13x8.bkt.clouddn.com/ground-hit.wav");

        game.load.image('background','http://p9lce13x8.bkt.clouddn.com/map.png');

        game.load.spritesheet('walk','http://p9lce13x8.bkt.clouddn.com/walk.png',120,120);
        game.load.image('player','http://p9lce13x8.bkt.clouddn.com/player.png');
        

        this.load.image('beijing', 'http://p9lce13x8.bkt.clouddn.com/beijing1.png');
		this.load.image('fly', 'http://p9lce13x8.bkt.clouddn.com/fly.png');
		this.load.image('platform_0', 'http://p9lce13x8.bkt.clouddn.com/taijie3.png');
		this.load.image('platform_3', 'http://p9lce13x8.bkt.clouddn.com/taijie5.png');
		this.load.image('platform_1', 'http://p9lce13x8.bkt.clouddn.com/taijie2.png');
		this.load.image('spring', 'http://p9lce13x8.bkt.clouddn.com/tanhuang.png');
		this.load.image('hole', 'http://p9lce13x8.bkt.clouddn.com/heidong0.png');
		this.load.audio('jump','http://p9lce13x8.bkt.clouddn.com/jump.mp3');
		this.load.audio('shoot','http://p9lce13x8.bkt.clouddn.com/spring.mp3');
		this.load.audio('hole','http://p9lce13x8.bkt.clouddn.com/hole.mp3');
        this.load.audio('click','http://p9lce13x8.bkt.clouddn.com/click.mp3');

        game.load.spritesheet('plat2', 'http://p9lce13x8.bkt.clouddn.com/plat.png',362,154,2);
        game.load.spritesheet('spring2','http://p9lce13x8.bkt.clouddn.com/spring.png',367,216,2);
        
        //ending
        game.load.tilemap('end', 'assets/end.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('endtile', 'http://p9lce13x8.bkt.clouddn.com/map2.png');
        game.load.image('castle', 'http://p9lce13x8.bkt.clouddn.com/castle.png');
        game.load.spritesheet('princess', 'http://p9lce13x8.bkt.clouddn.com/princess.png',120,120);
        game.load.image('word', 'http://p9lce13x8.bkt.clouddn.com/try.png');
        game.load.image('text1-1', 'http://p9lce13x8.bkt.clouddn.com/1-1@2x.png');
        game.load.image('text1-2', 'http://p9lce13x8.bkt.clouddn.com/1-2@2x.png');
        game.load.image('text1-3', 'http://p9lce13x8.bkt.clouddn.com/1-3@2x.png');
        game.load.image('text1-4', 'http://p9lce13x8.bkt.clouddn.com/1-4@2x.png');
        game.load.image('text1-5', 'http://p9lce13x8.bkt.clouddn.com/1-5@2x.png');
        game.load.image('text1-6_2-1', 'http://p9lce13x8.bkt.clouddn.com/1-6_2-1@2x.png');
        game.load.image('text2-2', 'http://p9lce13x8.bkt.clouddn.com/2-2@2x.png');
        game.load.image('text2-3', 'http://p9lce13x8.bkt.clouddn.com/2-3@2x.png');
        game.load.image('text2-4', 'http://p9lce13x8.bkt.clouddn.com/2-4@2x.png');
        game.load.image('text2-5', 'http://p9lce13x8.bkt.clouddn.com/2-5@2x.png');
        game.load.image('text2-6', 'http://p9lce13x8.bkt.clouddn.com/2-6@2x.png');
        game.load.image('text2-7', 'http://p9lce13x8.bkt.clouddn.com/2-7@2x.png');




        
    }
    this.create = function(){
        game.state.start('loadgif');
    }
};