function loadgif(game){
    this.init = function(){
        game.scale.pageAlignHorizontally=true;//水平居中
    }
    this.preload = function(){
        game.load.image('first','assets/img/first.png');
        game.load.spritesheet('start','assets/img/startbotton.png')
        game.load.spritesheet('gif','assets/img/gif.png',640,1136,24);
    }
    var button;
    var background;
    this.create = function(){
        background = game.add.image(0,0,'first');
        background.scale.x = window.innerWidth/420;
        background.scale.y = window.innerHeight/620;
        background.alpha = 0.3;
        button = game.add.button(game.world.centerX-120, 900, 'start', actionOnClick, this);
        function actionOnClick () {
            background.visible =! background.visible;
            var gif = game.add.sprite(0,0,'gif')
            var ani = gif.animations.add('play',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],2,false);
            ani.onComplete.add(startgame, this);
            ani.play('play');
            function startgame(){
                game.state.start('loadmario');
            }
        }
    }
    this.update = function(){
        // game.state.start('playmario');
        
    }
}