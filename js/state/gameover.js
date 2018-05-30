function gameover(game){
    var scaleconfig = window.innerWidth / 640;
    this.init = function () {
        game.scale.pageAlignHorizontally=true;//水平居中
        
    }
    this.create = function(){
        var tomb = game.add.sprite(35*scaleconfig , 80*scaleconfig, 'gameover');
            tomb.scale.set(3);
            tomb.alpha = 0;
        var tween = game.add.tween(tomb).to({alpha: 1}, 1500, Phaser.Easing.Linear.None,true);
        
        tween.onComplete.add(()=>{
            button = game.add.button(65*scaleconfig, 450*(window.innerHeight/580), 'restart', restart, this);
            button.scale.x = window.innerWidth/320;
            button.scale.y = window.innerHeight/580;
        },this);

        // console.log(curgame);
        function restart(){
            game.camera.fade(0x000000, 1000);
            game.camera.onFadeComplete.add(() => {
                switch(curgame){
                    case 1: 
                        game.state.start('playmario');
                        break;
                    case 2:
                        game.state.start('playblock');
                        break;
                    case 3:
                        game.state.start('playball');
                        break;
                    case 4:
                        game.state.start('playjump');
                        break;
                }
            }, this);
        }
        // game.state.start('');
    }
};