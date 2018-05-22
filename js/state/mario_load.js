var isPc;
function loadMario(game){
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
            game.load.image('background1','assets/img/background1.png');
            game.load.spritesheet('walk','assets/img/walk.png',120,120);


            game.load.tilemap('mario', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('tiles', 'assets/img/map1.png');
            game.load.image('bug','assets/img/heidong0.png');
            // game.load.image('land1','assets/img/land1.gif');
            // game.load.image('land2','assets/img/land2.gif');
            game.load.image('pipe','assets/img/pipe.png');
            // game.load.image('brick1','assets/brick1.gif');
            game.load.spritesheet('enemy','assets/img/monster.png',60,60);

    }
    this.create = function(){
        game.state.start('playmario');
    }
}