var isPc;
function loadball(game){
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
        game.load.image('ball', 'assets/img/ball.png');
        game.load.image('brick_1', 'assets/img/tanqiu1.png');
        game.load.image('brick_2', 'assets/img/tanqiu2.png');
        game.load.image('brick_3', 'assets/img/tanqiu3.png');
        game.load.image('brick_4', 'assets/img/tanqiu4.png');
        game.load.image('go', 'assets/img/资源2.png');
        game.load.image('back', 'assets/img/背景.png');
    }
    this.create = function(){
        game.state.start('playball');
    }
};