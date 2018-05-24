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
        game.load.image('bug','assets/img/heidong0.png');
        game.load.physics("blockdata", "assets/blockdatas.json");

        game.load.image('background','assets/img/map.png');

        game.load.spritesheet('walk','assets/img/walk.png',120,120);
        game.load.image('player','assets/img/player.png');
        game.load.audio('hitsound','assets/music/ground-hit.wav');
        
    }
    this.create = function(){
        game.state.start('playblock');
    }
}
