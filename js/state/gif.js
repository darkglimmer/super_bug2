function loadgif(game){
    this.preload = function(){
        game.load.spritesheet('gif','assets/img/gif.png',640,1136,24);
    }
    this.create = function(){
        var gif = game.add.sprite(20,20,'gif')
        var ani = gif.animations.add('play',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],2,false);
        // function playgif(){
        //     gif.animations.play('play');
        // }
        
        // game.time.events.repeat(24, 1, playgif); 
        ani.onComplete.add(startgame, this);
        ani.play('play');

        function startgame(){
            game.state.start('loadmario');
        }
        

    }
    this.update = function(){
        // game.state.start('playmario');
        
    }
}