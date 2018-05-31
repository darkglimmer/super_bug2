function loadgif(game){
    this.init = function(){
        game.scale.pageAlignHorizontally=true;//水平居中
    }
    this.preload = function(){
        game.load.image('first','assets/img/first.png');
        game.load.image('warning','assets/img/warning.png');
        game.load.image('muxi','assets/img/muxi@2x.png');
        game.load.spritesheet('start','assets/img/startbotton.png')
        game.load.spritesheet('gif','assets/img/gif.png',640,1136,24);
    }
    var button_1;
    var button_2;
    var Muxi;
    var background;
    this.create = function(){
        background = game.add.image(0,0,'first');
        background.scale.x = window.innerWidth/320;
        background.scale.y = window.innerHeight/570;
        background.alpha = 0.7;
        button_1 = game.add.button((game.world.centerX-250), 420*(window.innerHeight/580), 'start', actionOnClick_1, this);
        button_1.scale.x = window.innerWidth/640;
        button_1.scale.y = window.innerHeight/1136;
        button_2 = game.add.button((game.world.centerX-250), 460*(window.innerHeight/580), 'warning', actionOnClick_2, this);
        button_2.scale.x = window.innerWidth/640;
        button_2.scale.y = window.innerHeight/1136;
        Muxi = game.add.image((game.world.centerX-280), 500*(window.innerHeight/580),'muxi');
        Muxi.scale.x = window.innerWidth/1400;
        Muxi.scale.y = window.innerHeight/2200;
        function actionOnClick_1 () {
            background.visible =! background.visible;
            var gif = game.add.sprite(0,0,'gif')
            gif.scale.x = window.innerWidth/640;
            gif.scale.y = window.innerHeight/1136;
            var ani = gif.animations.add('play',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],2,false);
            ani.onComplete.add(startgame, this);
            ani.play('play');
            function startgame(){
                game.state.start('load');
            }
        }
        function actionOnClick_2 () {
            //跳转匣子
            window.open("https://ccnubox.muxixyz.com/"); 
        }
    }
    this.update = function(){        
    }
}