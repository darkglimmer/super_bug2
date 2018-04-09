var isPc;
function loadBlock(game){
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

        game.load.image('line','assets/img/i.png');
        game.load.image('iBox','assets/img/pc/IBox.png');
        game.load.image('lBox','assets/img/pc/LBox.png');
        game.load.image('oBox','assets/img/pc/OBox.png');
        game.load.image('tBox','assets/img/pc/TBox.png');
        game.load.image('xBox','assets/img/pc/XBox.png');

        game.load.tilemap('map_1',null,mapJson,Phaser.Tilemap.EAST);
        game.load.image('background','assets/img/map.png');
        game.load.image('mario','assets/img/mario.png');
        game.load.audio('ground_sound','assets/music/ground-hit.wav');
        game.load.image('flyplayer','assets/img/fly.png');
        
    }
    this.create = function(){
        game.state.start('playblock');
    }
}
